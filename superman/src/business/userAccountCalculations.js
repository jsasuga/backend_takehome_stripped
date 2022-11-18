import _ from "lodash";

import { convertBrandTokenAmountToUSD } from "../business/campaignCalculations.js";

// updateUserTokenBrandTokenBalance update the users tokenbalance based on the token sent
export function updateUserTokenBrandTokenBalance(userToReward, amount, brandID) {
    // check if the user already has tokens in the object
	if (!userToReward.tokens) {
        userToReward.tokens = [];
    }
    console.log(userToReward.tokens)
    // find the index of the token with the brandId provided
    const tokenIndex = _.findIndex(userToReward.tokens, function (t) {
		return t.brandID === brandID;
	});

    // either update or create a new token object
    const USDAmount = convertBrandTokenAmountToUSD(amount, brandID);
    const today = new Date();
    if (tokenIndex === -1) {
        const token = {
            brandID: brandID,
            balance: amount,
            USDBalance: USDAmount,
            lastUpdated: today.toDateString(),
        }
        userToReward.tokens.push(token);
    } else {
        userToReward.tokens[tokenIndex].balance += +amount;
        userToReward.tokens[tokenIndex].USDBalance += +USDAmount;
        userToReward.tokens[tokenIndex].lastUpdated = today.toDateString();
    }

	return userToReward;
}
