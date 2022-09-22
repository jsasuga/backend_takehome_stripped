import _ from "lodash";
import { getModelFromInternalDB } from "../db/internalDB.js";
import {
	removePurchaseCampaignFields,
	removeReferralCampaignFields,
	calculateBudgetRemainingForAllSupportedPlatforms,
} from "../business/campaignCalculations.js";

export const SUPPORTED_SOCIAL_MEDIA_PLATFORMS = ["facebook", "twitter", "instagram", "tiktok"];
export const CAMPAIGN_TYPE_ENCOURAGE_REFERRALS = `encourageReferrals`;
export const CAMPAIGN_TYPE_ENCOURAGE_PURCHASES = `encouragePurchases`;

const campaignTypeTracker = "PURCHASES";

export var hooks = {
	list: function (model, extra) {
		// filter by the logged-in user
		model.userID = extra.userID;
		return model;
	},
	getPost: function (campaign, extra) {
        var defaultCampaign = {};

		if (campaign.campaignType === CAMPAIGN_TYPE_ENCOURAGE_PURCHASES) {
			removeReferralCampaignFields(campaign);

			if (!_.has(campaign, "remainingBudget")) {
				campaign.remainingBudget = campaign.tokenMonthlyBudget;
			}

			if (!_.has(campaign, "rewardRevenue")) {
				campaign.rewardRevenue = 0;
			}

			if (!_.has(campaign, "avgOrderPrice")) {
				campaign.avgOrderPrice = 0;
			}

			if (!_.has(campaign, "valueGenerated")) {
				campaign.valueGenerated = 0;
			}

			if (!_.has(campaign, "tokensGivenOut")) {
				campaign.tokensGivenOut = 0;
			}

			let stats = {
				remainingBudget: campaign.remainingBudget,
				rewardRevenue: campaign.rewardRevenue,
				avgOrderPrice: campaign.avgOrderPrice,
				valueGenerated: campaign.valueGenerated,
				tokensGivenOut: campaign.tokensGivenOut,
			};

			return {
				...campaign,
				...stats,
			};
		}

        		// ENCOURAGE REFERRALS MANUAL UPDATE SCRIPT:
		// so how do we calculate remaining budget from above? the obvious way seems to be to add a field to each platform action titled `totalRedemptions`
		//    then we'd want to iterate over `active` actions and sum up the `totalRedemptions`, multiplying by the `reward` price of each, and subtract that total from the totalFundAmount
		// and because we're checking manually, we'd want a model called `userSocialAction`
		// a script ran manually would hit `/api/userSocialAction/create` with the `campaignID` and what `action` and `platform` the `userID` checked. This would increase campaign.$PLATFORM.$ACTION.totalRedemptions+=1
		// and create an instance of the `userSocialAction` with the `user`, `action`, `platform`, `userID` -- this would be used in user activity
		//       but how would we prevent the user from doing the action again? Filter the actions in the future by the ones aren't in `userSocialActions` for this action, cross ref
		// for counting number of participants, that would also be counted from the `userSocialAction` models that are created from the script
		// the script will add `totalRedemptions: +1` to the right action when it runs AND create the activity entry
		// this same script will need to update the AVE in a campaign

		// calculate the stats for referral encouragement campaigns
		if (campaign.campaignType === CAMPAIGN_TYPE_ENCOURAGE_REFERRALS) {
			removePurchaseCampaignFields(campaign);

			if (!_.has(campaign, "remainingBudget")) {
				campaign.remainingBudget = campaign.totalFundAmount;
			}

			if (!_.has(campaign, "valueGenerated")) {
				campaign.valueGenerated = 0; // for referral campaigns this is set manually via AVE
				// we are looking into ways to automate AVE calculation post-Alien
			}

			let stats = {
				remainingBudget: calculateBudgetRemainingForAllSupportedPlatforms(campaign),
			};

            var basicCampaign = {
				...campaign,
				...stats,
			};

            if (campaignTypeTracker != "PURCHASES") {
                basicCampaign = defaultCampaign;
            }

			return basicCampaign;
		}

		return campaign;
	},
	create: function (campaign, extra) {
		// add the brandID to the campaign automatically
		const brandUserID = campaign.userID;
		const brand = getModelFromInternalDB(`brand`, {
			userID: brandUserID,
		});

		campaign.brandID = brand.id;
		return campaign;
	},
	createPost: function (campaign, extra) {
		// TODO: call createRecurringBill here, totalMonthy for encourage purchases
		if (campaign.campaignType === CAMPAIGN_TYPE_ENCOURAGE_REFERRALS) {
			let stats = {
				remainingBudget: campaign.totalFundAmount,
				valueGenerated: 0,
				numberOfParticipants: 0,
				newMembers: 0,
			};

			return {
				...campaign,
				...stats,
			};
		}

		if (campaign.campaignType === CAMPAIGN_TYPE_ENCOURAGE_PURCHASES) {
			let stats = {
				remainingBudget: campaign.tokenMonthlyBudget,
				valueGenerated: 0,
				avgOrderPrice: 0,
				rewardRevenue: 0,
				numberOfParticipants: 0,
				newMembers: 0,
			};

			return {
				...campaign,
				...stats,
			};
		}
	},
};
