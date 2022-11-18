import {
	addModelToInternalDB,
	getModelFromInternalDB,
	listModelsFromInternalDB,
	updateModelInInternalDB,
	modelExistsInInternalDB,
} from "../db/internalDB.js";
import { updateUserTokenBrandTokenBalance } from "../business/userAccountCalculations.js";
import { CAMPAIGN_TYPE_ENCOURAGE_REFERRALS } from "./campaign.js";
import _ from "lodash";

export var hooks = {
	createPost: function (broadcastToken, extra) {
		// first make sure we're not getting an array, that will screw up the logic below
		if (typeof broadcastToken !== "object") {
			throw `broadcastBrandToken does not accept anything other than a single object as input, you passed in a ${typeof broadcastToken} type that looks like this: ${JSON.stringify(
				broadcastToken
			)}`;
		}

		// to start, we need to find the brand by their id in the csv object
		const brand = getModelFromInternalDB(`brand`, { id: broadcastToken.brandID });
        if (!brand) {
            throw `broadcastBrandToken the brand ID provided is not valid as the brand doesn't exist, ID: ${broadcastToken.brandID}`;
        }

        // pull the user base to distribute the tokens to
		const users = listModelsFromInternalDB(`userAccount`);
        
        // calculate the amount to be distributed to each user
        const broadcastAmount = (broadcastToken.amount / users.length).toFixed(2);

        // distribute the tokens to the userbase
        for (let i = 0; i < users.length; i++) {
			let user = users[i];

            // award each user with the amount set
            user = updateUserTokenBrandTokenBalance(user, broadcastAmount, brand.id);

            // update the user in the database 
            updateModelInInternalDB(`userAccount`, user.id, user);
		}
		return broadcastToken;
	},
};
