import { addModelToInternalDB, listModelsFromInternalDB, getModelFromInternalDB } from "../db/internalDB.js";
import { runHooks } from "../routes/hooks/crudHooks.js";
import { CAMPAIGN_TYPE_ENCOURAGE_PURCHASES, CAMPAIGN_TYPE_ENCOURAGE_REFERRALS } from "../models/campaign.js";
import { convertBrandTokenAmountToUSD } from "../business/campaignCalculations.js";
import _ from "lodash";
import { logger } from "../logger.js";
import { ulid } from "ulid";

describe("encourage referrals campaign -- hooks", function () {
	it("getPost hook should return the remainingBudget analytic, and test campaign create hook adds brandID", async function () {
		const referralCampaignRequest = {
			userID: "userID1",
			name: "MGA LOL Surprise Campaign",
			description:
				"MGA wants to promote it's new collectable Rainbow High kids doll line by incentivizing consumers to promote the brand on Facebook and Instagram",
			campaignType: CAMPAIGN_TYPE_ENCOURAGE_REFERRALS,
			ongoing: false,
			startDate: "2022-05-11T04:00:00.000Z",
			endDate: "2022-05-31T04:00:00.000Z",
			tokenRewardAmount: 1,
			tokenRewardMaxAmount: 0,
			tokenRewardUseMaxAmount: false,
			tokenMonthlyBudget: 100,
			totalFundAmount: 1260,
			instagramFundAmount: 770,
			twitterFundAmount: 0,
			facebookFundAmount: 490,
			hashtags: ["#bogo"],
			instagramProfile: "mgae_ig",
			facebookProfile: "mgae_fb",
			twitterProfile: "mgae_tw",
			specialInstructions: "Share and comment on Instagram, or like on Facebook to get 1000 $MGA",
			instagram: {
				active: true,
				posts: { active: false, reward: 0, available: 0 },
				comments: { active: true, reward: 1.5, available: 140 },
				shares: { active: true, reward: 4, available: 140 },
			},
			facebook: {
				active: true,
				posts: { active: false, reward: 0, available: 0 },
				comments: { active: false, reward: 0, available: 0 },
				likes: { active: true, reward: 3.5, available: 140, totalRedemptions: 100 },
			},
			twitter: {
				active: false,
				tweets: { active: false, reward: 0, available: 0 },
				shares: { active: false, reward: 0, available: 0 },
				retweets: { active: false, reward: 0, available: 0 },
			},
		};

		const BRAND_ID = `brandID1`;

		// add the brand first so that we set also test that the brandID on the campaign
		addModelToInternalDB(`brand`, { id: BRAND_ID, userID: `userID1` });

		// first populate the DB with the campaign so that we when we run the hook we can confirm if we get the analytics
		const referralCampaignFromDB = await runHooks(`create`, `campaign`, referralCampaignRequest, {});

		// test that the brand ID is set by the hook
		expect(referralCampaignFromDB.brandID).toBe(BRAND_ID);

		// addModelToInternalDB(`campaign`, referralCampaignFromDB);
		expect(referralCampaignFromDB.remainingBudget).toBe(undefined);

		const campaignReturned = await runHooks("getPost", `campaign`, referralCampaignFromDB, {});

		// confirm the total fund amount is still there
		expect(campaignReturned.totalFundAmount).toBe(referralCampaignFromDB.totalFundAmount);

		// confirm there's a remaining budget field and that it's correct
		expect(campaignReturned.remainingBudget).toBe(910);
	});
});

describe("purchase encouragement campaign", function () {
	it("should return several analytics related to purchases", async function () {
		const purchaseCampaignRequest = {
			userID: "userID2",
			name: "MGAs Next Generation Web3 Rewards Program",
			description: "",
			campaignType: "encouragePurchases",
			ongoing: false,
			startDate: "2022-05-11T04:00:00.000Z",
			endDate: "2023-05-24T04:00:00.000Z",
			tokenRewardAmount: 4,
			tokenRewardMaxAmount: 10,
			tokenRewardUseMaxAmount: true,
			tokenMonthlyBudget: 1000,
			totalFundAmount: 0,
			instagramFundAmount: 0,
			twitterFundAmount: 0,
			facebookFundAmount: 0,
			hashtags: [],
			instagramProfile: "",
			facebookProfile: "",
			twitterProfile: "",
			specialInstructions: "",
			instagram: {
				active: false,
				posts: { active: false, reward: 0, available: 0 },
				comments: { active: false, reward: 0, available: 0 },
				shares: { active: false, reward: 0, available: 0 },
			},
			facebook: {
				active: false,
				posts: { active: false, reward: 0, available: 0 },
				comments: { active: false, reward: 0, available: 0 },
				likes: { active: false, reward: 0, available: 0 },
			},
			twitter: {
				active: false,
				tweets: { active: false, reward: 0, available: 0 },
				shares: { active: false, reward: 0, available: 0 },
				retweets: { active: false, reward: 0, available: 0 },
			},
		};

		//--------------------------- Part 0: make sure the campaign doesn't start with analytics -----------------------------//

		// first populate the DB with the campaign so that we when we the webhook code and can confirm that analytics are added
		addModelToInternalDB(`campaign`, purchaseCampaignRequest);

		// first confirm that none of these are set on the campaign
		expect(purchaseCampaignRequest.tokensGivenOut).toBe(undefined);
		expect(purchaseCampaignRequest.remainingBudget).toBe(undefined);
		expect(purchaseCampaignRequest.valueGenerated).toBe(undefined);
		expect(purchaseCampaignRequest.participants).toBe(undefined);
		expect(purchaseCampaignRequest.avgOrderPrice).toBe(undefined);

		// confirm the total fund amount is still there
		expect(purchaseCampaignRequest.tokenMonthlyBudget).toBe(1000);
	});
});

// 	// just for tests -- can make e2es with this
// https://stackoverflow.com/questions/17690803/node-js-getaddrinfo-enotfound
// await axios.post(`https://${WEBHOOK_RECEIVER_URL}${WEBHOOK_RECEIVE_ROUTE}`, ORDER_WEBHOOK_RESPONSE);

// newWebhookOrderResponse returns a valid shopify orders webhook. The fields param lets you override values in the default response JSON below
function newWebhookOrderResponse(fields) {
	return {
		id: ulid(),
		...ORDER_WEBHOOK_RESPONSE,
		...fields,
	};
}

const ORDER_WEBHOOK_RESPONSE = {
	email: "consumer1@mgae.com",
	closed_at: null,
	created_at: "2022-04-06T08:09:03-04:00",
	updated_at: "2022-04-06T08:09:03-04:00",
	number: 234,
	note: null,
	token: "123456abcd",
	gateway: null,
	test: true,
	total_price: "403.55",
	subtotal_price: "393.00",
	total_weight: 0,
	total_tax: "0.00",
	taxes_included: false,
	currency: "USD",
	financial_status: "voided",
	confirmed: false,
	total_discounts: "5.00",
	total_line_items_price: "398.00",
	cart_token: null,
	buyer_accepts_marketing: true,
	name: "#9999",
	referring_site: null,
	landing_site: null,
	cancelled_at: "2022-04-06T08:09:03-04:00",
	cancel_reason: "customer",
	total_price_usd: null,
	checkout_token: null,
	reference: null,
	user_id: null,
	location_id: null,
	source_identifier: null,
	source_url: null,
	processed_at: null,
	device_id: null,
	phone: null,
	customer_locale: "en",
	app_id: null,
	browser_ip: null,
	landing_site_ref: null,
	order_number: 1234,
	discount_applications: [
		{
			type: "manual",
			value: "5.0",
			value_type: "fixed_amount",
			allocation_method: "each",
			target_selection: "explicit",
			target_type: "line_item",
			description: "Discount",
			title: "Discount",
		},
	],
	discount_codes: [],
	note_attributes: [],
	payment_gateway_names: ["visa", "bogus"],
	processing_method: "",
	checkout_id: null,
	source_name: "web",
	fulfillment_status: "pending",
	tax_lines: [],
	tags: "",
	contact_email: "jon@doe.ca",
	order_status_url: "https://jsmith.myshopify.com/548380009/orders/123456abcd/authenticate?key=abcdefg",
	presentment_currency: "USD",
	total_line_items_price_set: {
		shop_money: {
			amount: "398.00",
			currency_code: "USD",
		},
		presentment_money: {
			amount: "398.00",
			currency_code: "USD",
		},
	},
	total_discounts_set: {
		shop_money: {
			amount: "5.00",
			currency_code: "USD",
		},
		presentment_money: {
			amount: "5.00",
			currency_code: "USD",
		},
	},
	total_shipping_price_set: {
		shop_money: {
			amount: "10.00",
			currency_code: "USD",
		},
		presentment_money: {
			amount: "10.00",
			currency_code: "USD",
		},
	},
	subtotal_price_set: {
		shop_money: {
			amount: "393.00",
			currency_code: "USD",
		},
		presentment_money: {
			amount: "393.00",
			currency_code: "USD",
		},
	},
	total_price_set: {
		shop_money: {
			amount: "403.00",
			currency_code: "USD",
		},
		presentment_money: {
			amount: "403.00",
			currency_code: "USD",
		},
	},
	total_tax_set: {
		shop_money: {
			amount: "0.00",
			currency_code: "USD",
		},
		presentment_money: {
			amount: "0.00",
			currency_code: "USD",
		},
	},
	line_items: [
		{
			id: 866550311766439020,
			variant_id: 808950810,
			title: "IPod Nano - 8GB",
			quantity: 1,
			sku: "IPOD2008PINK",
			variant_title: null,
			vendor: null,
			fulfillment_service: "manual",
			product_id: 632910392,
			requires_shipping: true,
			taxable: true,
			gift_card: false,
			name: "IPod Nano - 8GB",
			variant_inventory_management: "shopify",
			properties: [],
			product_exists: true,
			fulfillable_quantity: 1,
			grams: 567,
			price: "199.00",
			total_discount: "0.00",
			fulfillment_status: null,
			price_set: {
				shop_money: {
					amount: "199.00",
					currency_code: "USD",
				},
				presentment_money: {
					amount: "199.00",
					currency_code: "USD",
				},
			},
			total_discount_set: {
				shop_money: {
					amount: "0.00",
					currency_code: "USD",
				},
				presentment_money: {
					amount: "0.00",
					currency_code: "USD",
				},
			},
			discount_allocations: [],
			duties: [],
			admin_graphql_api_id: "gid://shopify/LineItem/866550311766439020",
			tax_lines: [],
		},
		{
			id: 141249953214522974,
			variant_id: 808950810,
			title: "IPod Nano - 8GB",
			quantity: 1,
			sku: "IPOD2008PINK",
			variant_title: null,
			vendor: null,
			fulfillment_service: "manual",
			product_id: 632910392,
			requires_shipping: true,
			taxable: true,
			gift_card: false,
			name: "IPod Nano - 8GB",
			variant_inventory_management: "shopify",
			properties: [],
			product_exists: true,
			fulfillable_quantity: 1,
			grams: 567,
			price: "199.00",
			total_discount: "5.00",
			fulfillment_status: null,
			price_set: {
				shop_money: {
					amount: "199.00",
					currency_code: "USD",
				},
				presentment_money: {
					amount: "199.00",
					currency_code: "USD",
				},
			},
			total_discount_set: {
				shop_money: {
					amount: "5.00",
					currency_code: "USD",
				},
				presentment_money: {
					amount: "5.00",
					currency_code: "USD",
				},
			},
			discount_allocations: [
				{
					amount: "5.00",
					discount_application_index: 0,
					amount_set: {
						shop_money: {
							amount: "5.00",
							currency_code: "USD",
						},
						presentment_money: {
							amount: "5.00",
							currency_code: "USD",
						},
					},
				},
			],
			duties: [],
			admin_graphql_api_id: "gid://shopify/LineItem/141249953214522974",
			tax_lines: [],
		},
	],
	fulfillments: [],
	refunds: [],
	total_tip_received: "0.0",
	original_total_duties_set: null,
	current_total_duties_set: null,
	payment_terms: null,
	admin_graphql_api_id: "gid://shopify/Order/820982911946154508",
	shipping_lines: [
		{
			id: 271878346596884015,
			title: "Generic Shipping",
			price: "10.00",
			code: null,
			source: "shopify",
			phone: null,
			requested_fulfillment_service_id: null,
			delivery_category: null,
			carrier_identifier: null,
			discounted_price: "10.00",
			price_set: {
				shop_money: {
					amount: "10.00",
					currency_code: "USD",
				},
				presentment_money: {
					amount: "10.00",
					currency_code: "USD",
				},
			},
			discounted_price_set: {
				shop_money: {
					amount: "10.00",
					currency_code: "USD",
				},
				presentment_money: {
					amount: "10.00",
					currency_code: "USD",
				},
			},
			discount_allocations: [],
			tax_lines: [],
		},
	],
	billing_address: {
		first_name: "Bob",
		address1: "123 Billing Street",
		phone: "555-555-BILL",
		city: "Billtown",
		zip: "K2P0B0",
		province: "Kentucky",
		country: "United States",
		last_name: "Biller",
		address2: null,
		company: "My Company",
		latitude: null,
		longitude: null,
		name: "Bob Biller",
		country_code: "US",
		province_code: "KY",
	},
	shipping_address: {
		first_name: "Steve",
		address1: "123 Shipping Street",
		phone: "555-555-SHIP",
		city: "Shippington",
		zip: "40003",
		province: "Kentucky",
		country: "United States",
		last_name: "Shipper",
		address2: null,
		company: "Shipping Company",
		latitude: null,
		longitude: null,
		name: "Steve Shipper",
		country_code: "US",
		province_code: "KY",
	},
	customer: {
		id: 115310627314723954,
		email: "john@test.com",
		accepts_marketing: false,
		created_at: null,
		updated_at: null,
		first_name: "John",
		last_name: "Smith",
		orders_count: 0,
		state: "disabled",
		total_spent: "0.00",
		last_order_id: null,
		note: null,
		verified_email: true,
		multipass_identifier: null,
		tax_exempt: false,
		phone: null,
		tags: "",
		last_order_name: null,
		currency: "USD",
		accepts_marketing_updated_at: null,
		marketing_opt_in_level: null,
		email_marketing_consent: {
			state: "not_subscribed",
			opt_in_level: null,
			consent_updated_at: null,
		},
		sms_marketing_consent: null,
		admin_graphql_api_id: "gid://shopify/Customer/115310627314723954",
		default_address: {
			id: 715243470612851245,
			customer_id: 115310627314723954,
			first_name: null,
			last_name: null,
			company: null,
			address1: "123 Elm St.",
			address2: null,
			city: "Ottawa",
			province: "Ontario",
			country: "Canada",
			zip: "K2H7A8",
			phone: "123-123-1234",
			name: "",
			province_code: "ON",
			country_code: "CA",
			country_name: "Canada",
			default: true,
		},
	},
};
