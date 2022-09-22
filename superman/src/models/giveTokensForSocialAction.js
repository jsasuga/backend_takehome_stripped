import {
	addModelToInternalDB,
	getModelFromInternalDB,
	listModelsFromInternalDB,
	updateModelInInternalDB,
	modelExistsInInternalDB,
} from "../db/internalDB.js";
import { updateUserTokenBrandTokenBalance, findUserByPlatformHandle } from "../business/userAccountCalculations.js";
import { UPLOAD_SECRET_KEY } from "../business/giveTokensForSocialActionCalculations.js";
import { CAMPAIGN_TYPE_ENCOURAGE_REFERRALS } from "./campaign.js";
import _ from "lodash";

export var hooks = {
	createPost: function (socialActionToReward, extra) {
		// first make sure we're not getting an array, that will screw up the logic below
		if (typeof socialActionToReward !== "object") {
			throw `giveTokensForSocialAction does not accept anything other than a single object as input, you passed in a ${typeof socialActionToReward} type that looks like this: ${JSON.stringify(
				socialActionToReward
			)}`;
		}

		// make sure the user has the secret key before proceeding further
		if (!_.has(socialActionToReward, `secretKey`)) {
			return socialActionToReward;
		}

		if (!socialActionToReward.secretKey === UPLOAD_SECRET_KEY) {
			return socialActionToReward;
		}
		
		// to start, we need to find the brand by their name in the csv object
		const brand = getModelFromInternalDB(`brand`, { name: socialActionToReward.brandName });

		// get the user that did the action so that we can give them tokens
		const userToReward = findUserByPlatformHandle(socialActionToReward.platform, socialActionToReward.username);

		// next, we need to find the social campaigns for that brand so that we can find how much to reward the user for this action taken
		const socialCampaigns = listModelsFromInternalDB(`campaign`, {
			brandID: brand.id,
			campaignType: CAMPAIGN_TYPE_ENCOURAGE_REFERRALS,
		});

		for (let i = 0; i < socialCampaigns.length; i++) {
			const socialCampaign = socialCampaigns[i];

			if (
				modelExistsInInternalDB(`userActivity`, {
					userID: userToReward.id,
					rewardedCampaignID: socialCampaign.id,
					platform: socialActionToReward.platform,
					action: socialActionToReward.action,
				})
			) {
				return socialActionToReward; // they've already been rewarded for this action, get out
			}

			const platformToReward = socialCampaign[socialActionToReward.platform];
			const platformFields = Object.keys(platformToReward);
			for (let j = 0; j < platformFields.length; j++) {
				const platformKey = platformFields[j];

				// this campaign should be active or we're not rewarding the user for their action
				const platformNotActive = platformKey === `active` && !platformToReward[platformKey];
				if (platformNotActive) {
					continue; // move on
				}

				// if `like` in `likes` (or whatever action), then find the token reward value of this action for this campaign
				const actionFound = platformKey.includes(socialActionToReward.action);
				const actionIsActive = platformToReward[platformKey].active;
				const campaignHasRewardAvailable = platformToReward[platformKey].available > 0;

				// if we found the action, and it's active AND it has rewards available to give away, let's do it!
				if (actionFound && actionIsActive && campaignHasRewardAvailable) {
					const tokenReward = platformToReward[platformKey].reward;
					// then, we want to reward the user with that amount of tokens
					updateUserTokenBrandTokenBalance(userToReward, tokenReward, brand.id);

					// and THEN, we want to create a user activity saying the user did this thing and got rewarded
					addModelToInternalDB(`userActivity`, {
						userID: userToReward.id,
						tokensGivenOut: tokenReward,
						brandID: brand.id,
						source: CAMPAIGN_TYPE_ENCOURAGE_REFERRALS,
						isReceived: true,
						platform: socialActionToReward.platform,
						action: socialActionToReward.action,
						description: `${socialActionToReward.platform} ${socialActionToReward.action}`,
						rewardedCampaignID: socialCampaign.id,
					});

					socialCampaign[socialActionToReward.platform][platformKey].available -= 1;
					updateModelInInternalDB(`campaign`, socialCampaign.id, socialCampaign);
				}
			}
		}
		return socialActionToReward;
	},
};
