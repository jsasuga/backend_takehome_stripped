import { 
    addModelToInternalDB, 
    listModelsFromInternalDB, 
    getModelFromInternalDB 
} from "../db/internalDB.js";
import { runHooks } from "../routes/hooks/crudHooks.js";
import { convertBrandTokenAmountToUSD } from "../business/campaignCalculations.js";
import _ from "lodash";

describe("broadcast brand tokens -- hooks", function () {
	it("createPost hook should distribute an amount of a brand token to the whole userbase", async function () {
		const BRAND_ID = `brandID1`;
        const broadcastBrandTokenRequest = {
			brandID: BRAND_ID,
            amount: 10
		};

		// add the brand first so that we set also test that the brandID on the campaign
		addModelToInternalDB(`brand`, { id: BRAND_ID, userID: `userID1` });

        // add a couple of users users to distribute the tokens to
		
        // user one has no tokens assigned
        addModelToInternalDB(`userAccount`, { id: 'userID1', name: "user one", email: `user01@email.com`});
        
        // user two already has a balance of the token for brandID1
		addModelToInternalDB(`userAccount`, { id: 'userID2', name: "user two", email: `user02@email.com`, tokens: [{
            brandID: BRAND_ID,
            balance: 700,
            USDBalance: 1000,
            lastUpdated: `May 20 2022`,
        }]});

        // user three doesn't have a balance on the token for brandID2 but it has a balance for other tokens
        addModelToInternalDB(`userAccount`, { id: 'userID3', name: "user three", email: `user02@email.com`, tokens: [{
            brandID: "brandID2",
            balance: 700,
            USDBalance: 1000,
            lastUpdated: `May 20 2022`,
        }]});

		// first populate the DB with the campaign so that we when we run the hook we can confirm if we get the analytics
		const broadcastBrandTokenResponse = await runHooks(`createPost`, `broadcastBrandToken`, broadcastBrandTokenRequest, {});

		// test that the brand ID is set by the hook
		expect(broadcastBrandTokenResponse.brandID).toBe(BRAND_ID);

        // pull the users after running the hook to check if their balances have been updated
		const users = listModelsFromInternalDB(`userAccount`);
        const broadcastedAmountPerUser = (broadcastBrandTokenRequest.amount / users.length).toFixed(2);
        const broadcastedUSDAmountPerUser = convertBrandTokenAmountToUSD(broadcastedAmountPerUser, BRAND_ID);

        // check the first user it should be just the new amount as the user didn't have any tokens
        expect(users[0].tokens[0].brandID).toBe(BRAND_ID);
        expect(users[0].tokens[0].balance).toBe(broadcastedAmountPerUser);
        expect(users[0].tokens[0].USDBalance).toBe(broadcastedUSDAmountPerUser);

        // check the second user it should be previous amount + new amount
        expect(users[1].tokens[0].brandID).toBe(BRAND_ID);
        expect(users[1].tokens[0].balance).toBe(700 + +broadcastedAmountPerUser);
        expect(users[1].tokens[0].USDBalance).toBe(1000 + +broadcastedUSDAmountPerUser);

        // check the third user it should be just the new amount as the token didn't exist before on the user
        expect(users[2].tokens[1].brandID).toBe(BRAND_ID);
        expect(users[2].tokens[1].balance).toBe(broadcastedAmountPerUser);
        expect(users[2].tokens[1].USDBalance).toBe(broadcastedUSDAmountPerUser);
	});
});