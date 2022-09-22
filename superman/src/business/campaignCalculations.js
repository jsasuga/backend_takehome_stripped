import _ from "lodash";
import csv from "csvtojson";
import { logger } from "../logger.js";

export const SUPPORTED_SOCIAL_MEDIA_PLATFORMS = ["facebook", "twitter", "instagram", "tiktok"];
const BRAND_TOKEN_EXCHANGE_RATE = 0.1; // TODO: store this in the `brand` table later, Jeong wants 10c/token for the demo

const REFERRAL_FIELDS = [
	...SUPPORTED_SOCIAL_MEDIA_PLATFORMS,
	"totalFundAmount",
	"instagramFundAmount",
	"twitterFundAmount",
	"facebookFundAmount",
	"hashtags",
	"instagramProfile",
	"facebookProfile",
	"twitterProfile",
	"specialInstructions",
];

const PURCHASE_FIELDS = ["tokenRewardAmount", "tokenRewardMaxAmount", "tokenRewardUseMaxAmount"];

function removeFieldsFromObject(obj, fields) {
	for (let i in fields) {
		const field = fields[i];
		delete obj[field];
	}
	return obj;
}

export function removePurchaseCampaignFields(campaign) {
	return removeFieldsFromObject(campaign, PURCHASE_FIELDS);
}

export function removeReferralCampaignFields(campaign) {
	return removeFieldsFromObject(campaign, REFERRAL_FIELDS);
}

// listActivePlatformActions return all the platform actions
export function listActivePlatformActions(platform) {
	const activeDetails = _.filter(platform, function (o) {
		if (typeof o === "object" && _.has(o, "active")) {
			return o;
		}
	});
	return activeDetails;
}

// listActivePlatformActionsWithRedemptions return all the platform actions with at least one redemption
function listActivePlatformActionsWithRedemptions(platform) {
	const activeDetails = _.filter(listActivePlatformActions(platform), function (o) {
		if (o.totalRedemptions > 0) {
			return o;
		}
	});
	return activeDetails;
}

// calculateTotalFundsGivenOutForSocialActions return the cost of all social actions in the list
// cost = action.reward * action.totalRedemptions
function calculateTotalFundsGivenOutForSocialActions(actionsWithRedemptions) {
	let totalCost = 0;
	for (let i in actionsWithRedemptions) {
		let currAction = actionsWithRedemptions[i];
		totalCost = totalCost + currAction.reward * currAction.totalRedemptions;
	}
	return totalCost;
}

// calculateBudgetRemainingForAllSupportedPlatforms return the remaining budget on the campaign by calculating the number of redemptions across all platforms and social actions
export function calculateBudgetRemainingForAllSupportedPlatforms(campaign) {
	let totalRemainingBudget = campaign.remainingBudget;
	for (let i in SUPPORTED_SOCIAL_MEDIA_PLATFORMS) {
		const platform = SUPPORTED_SOCIAL_MEDIA_PLATFORMS[i];
		const moneyGivenOutOnPlatform = calculateMoneyGivenOutOnPlatform(campaign[platform]);
		totalRemainingBudget = totalRemainingBudget - moneyGivenOutOnPlatform;
	}
	return totalRemainingBudget;
}

// calculateMoneyGivenOutOnPlatform return the amount of dollars given out to consumers for social actions on the given platform
function calculateMoneyGivenOutOnPlatform(platform) {
	const actionsWithRedemptions = listActivePlatformActionsWithRedemptions(platform);
	const moneyGivenOut = calculateTotalFundsGivenOutForSocialActions(actionsWithRedemptions);
	return moneyGivenOut;
}

export function convertUSDToBrandTokenAmount(USDAmount, brandID) {
	// TODO: get brand using brandID and use that exchange rate instead
	return USDAmount / BRAND_TOKEN_EXCHANGE_RATE;
}

export function convertBrandTokenAmountToUSD(brandTokenAmount, brandID) {
	// TODO: get brand using brandID and use that exchange rate instead
	return brandTokenAmount * BRAND_TOKEN_EXCHANGE_RATE;
}

export async function readFilepathCSVToJSON(csvFilePath) {
	var socialRecords = await csv().fromFile(csvFilePath);
	logger.info(`detected ${socialRecords.length} socialRecords data=%s`, socialRecords);
	return socialRecords;
}
