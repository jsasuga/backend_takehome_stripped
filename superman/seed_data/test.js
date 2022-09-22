import {image as some_image} from "./big_data/some_image.js";
import {image as icon} from "./big_data/icon.js";
import merchantConfig from "./merchantConfig.js";
import widgetConfig from "./widgetConfig.js";

export default {
    ...merchantConfig,
    ...widgetConfig,
    brand: [
		{
            id: `brandID11`,
            userID: "userID2",
            shopifyShopURL: `cultosdev.myshopify.com`
        },
		{
            id: `brandIDForSocialActionsRewardsTest`,
            userID: "brandIDForSocialActionsRewardsTestID",
            name: `dishonestco`,
            shopifyShopURL: `cultosdev.myshopify.com`
        },
        {
            id: "1",
            userID: "2",
            name: 'DOLE TIME',
            description: 'This is the description for my thing.',
            color: '#FF0000',
            brandIMG: some_image,
            tokenName: '$DOLETIME',
            tokenIMG: some_image,
            createdAt: 1651095786582,
            createdAtFormatted: 'Wed Apr 27 2022 17:43:06 GMT-0400 (Eastern Daylight Time)',
            defaultCampaignType: '',
            inviteCode: '',
            shopifyShopURL: 'cultosapptest.myshopify.com',
            isWidgetEnabled: false,
        },
        // yes, this is a duplicate, but we need to for the tests
        {
            id: "0",
            userID: "1",
            name: 'DOLE TIME',
            description: 'This is the description for my thing.',
            color: '#FF0000',
            brandIMG: some_image,
            tokenName: '$DOLETIME',
            tokenIMG: some_image,
            createdAt: 1651095786582,
            createdAtFormatted: 'Wed Apr 27 2022 17:43:06 GMT-0400 (Eastern Daylight Time)',
            defaultCampaignType: '',
            inviteCode: '',
            shopifyShopURL: '',
            isWidgetEnabled: false
        },
        // {
        //     id: "2",
        //     userID: "5",
        //     name: 'CYPRESS BRAND',
        //     description: 'Cypress Brand',
        //     color: '#FF0000',
        //     brandIMG: some_image,
        //     tokenName: '$CYPRESS',
        //     tokenIMG: some_image,
        //     createdAt: 1651095786582,
        //     defaultCampaignType: '',
        //     createdAtFormatted: 'Wed Apr 27 2022 17:43:06 GMT-0400 (Eastern Daylight Time)',
        //     inviteCode: '',
        //     shopifyShopURL: 'cultosdev-kyle.myshopify.com',
        //     "isWidgetEnabled": false,
        // },
        // {
        //     id: "2",
        //     userID: "3",
        //     name: 'NIKE',
        //     description: 'This is the description for my thing.',
        //     color: '#FF0000',
        //     brandIMG: some_image,
        //     tokenName: '$NIKE',
        //     tokenIMG: some_image,
        //     createdAt: 1651095786582,
        //     createdAtFormatted: 'Wed Apr 27 2022 17:43:06 GMT-0400 (Eastern Daylight Time)',
        //     defaultCampaignType: '',
        //     inviteCode: '',
        //     shopifyShopURL: 'cultosdev-kyle.myshopify.com',
        //     "isWidgetEnabled": false,
        //     shopifyShopURL: "nike.myshopify.com"
        // },
    ],
    customer: [
        {
            fullName: '',
            email: ''
        }
    ],
    // this is the model that the frontend gives us
    onboarding: [
        {
            fullName: 'Bob Dole',
            email: 'email@internet.com',
            brandName: 'DOLE TIME',
            brandDescription: 'This is the description for my thing.',
            brandColor: '#FF0000',
            brandIMG: '',
            tokenName: '$DOLETIME',
            tokenIMG: '',
            password: 'secretPassword123#',
            confirmPassword: 'secretPassword123#',
            agreedToTerms: true,
            defaultCampaignType: 'encourageReferrals',
            inviteCode: '',
            shopifyShopURL: 'cultosapptest.myshopify.com',
            id: '01G1PFMN2NVHREPBHRRN6PMYXH',
            createdAt: 1651095786582,
            createdAtFormatted: 'Wed Apr 27 2022 17:43:06 GMT-0400 (Eastern Daylight Time)'
        }
    ],
    campaign: [
        {
            "name": "Test Campaign - seeded",
            "description": "This campaign is for making money. - seeded",
            "campaignType": "encouragePurchases",
            "startDate": "2022-03-01T05:00:00.000Z",
            "endDate": "2022-03-31T04:00:00.000Z",
            "tokenRewardAmount": 0.01,
            "totalFundAmount": 100,
            "instagramFundAmount": 100,
            "twitterFundAmount": 0,
            "facebookFundAmount": 0,
            "hashtags": "#pencils",
            "instagramProfile": "www.insta.com",
            "specialInstructions": "Make sure that you do it right!",
            "instagram": {
                "active": true,
                "mentions": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                }
            },
            "facebook": {
                "active": true,
                "shares": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "mentions": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "twitter": {
                "active": false,
                "retweets": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "tiktok": {
                "active": true,
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "id": "01FXR4XZF4MTADVSMWD3JTKGSP",
            "userID": "2",
            "remainingBudget": 100,
            "valueGenerated": 0,
            "campaignType": "encourageReferrals"
        },
        {
            "name": "Test Campaign - seeded",
            "description": "This campaign is for making money. - seeded",
            "campaignType": "encouragePurchases",
            "startDate": "2022-03-01T05:00:00.000Z",
            "endDate": "2022-03-31T04:00:00.000Z",
            "tokenRewardAmount": 0.01,
            "tokenMonthlyBudget": 100,
            "instagramFundAmount": 100,
            "twitterFundAmount": 0,
            "facebookFundAmount": 0,
            "hashtags": "#pencils",
            "instagramProfile": "www.insta.com",
            "specialInstructions": "Make sure that you do it right!",
            "instagram": {
                "active": true,
                "mentions": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                }
            },
            "facebook": {
                "active": true,
                "shares": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "mentions": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {

                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "twitter": {
                "active": false,
                "retweets": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {

                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "tiktok": {
                "active": true,
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {

                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "id": "01FXR4XZF4MTADLKJLKJJLKJTKGSP",
            "userID": "1",
            "remainingBudget": 100,
            "valueGenerated": 0,
            "campaignType": "encouragePurchases"
        },
        {
            "userID": "1",
            "name": "Test Campaign Referrals 456",
            "description": "This campaign is for making money.",
            "campaignType": "encourageReferrals",
            "ongoing": false,
            "startDate": "2040-05-15T04:00:00.000Z",
            "endDate": "2040-06-15T04:00:00.000Z",
            "tokenRewardAmount": 0.01,
            "tokenRewardMaxAmount": 0,
            "tokenRewardUseMaxAmount": false,
            "tokenMonthlyBudget": 100,
            "totalFundAmount": 250,
            "instagramFundAmount": 100,
            "twitterFundAmount": 0,
            "facebookFundAmount": 50,
            "tiktokFundAmount": 100,
            "hashtags": [
                "#pencils"
            ],
            "instagramProfile": "www.insta.com",
            "facebookProfile": "",
            "twitterProfile": "",
            "specialInstructions": "Make sure that you do it right!",
            "instagram": {
                "active": true,
                "mentions": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {

                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                }
            },
            "facebook": {
                "active": true,
                "shares": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "mentions": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "twitter": {
                "active": false,
                "retweets": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {

                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "tiktok": {
                "active": true,
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {

                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "remainingBudget": 250,
            "brandID": "1",
            "id": "01G3APFNB9AP5HXX3FR5YJWV8P",
            "createdAt": 1652847793514,
            "createdAtFormatted": "Wed May 18 2022 00:23:13 GMT-0400 (Eastern Daylight Time)"
        },
        {
            "userID": "5",
            "name": "Test Campaign Referrals All",
            "description": "campaign-description",
            "campaignType": "encourageReferrals",
            "ongoing": false,
            "startDate": "2040-05-15T04:00:00.000Z",
            "endDate": "2040-06-15T04:00:00.000Z",
            "tokenRewardAmount": 0.01,
            "tokenRewardMaxAmount": 0,
            "tokenRewardUseMaxAmount": false,
            "tokenMonthlyBudget": 100,
            "totalFundAmount": 700,
            "instagramFundAmount": 200,
            "twitterFundAmount": 150,
            "facebookFundAmount": 200,
            "tiktokFundAmount": 150,
            "hashtags": [
                "#hashtag"
            ],
            "instagramProfile": "instagram-profile",
            "facebookProfile": "facebook-profile",
            "twitterProfile": "twitter-profile",
            "specialInstructions": "special-instruction",
            "instagram": {
                "active": true,
                "mentions": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                }
            },
            "facebook": {
                "active": true,
                "shares": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "mentions": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                }
            },
            "twitter": {
                "active": true,
                "retweets": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                }
            },
            "tiktok": {
                "active": true,
                "follows": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": true, "reward": 1, "available": 50,
                    specialInstruction: "",
                }
            },
            "brandID": "2",
            "id": "01G3APFNB9AP5HXX3FR5YJWV8V",
            "createdAt": 1652847793514,
            "createdAtFormatted": "Wed May 18 2022 00:23:13 GMT-0400 (Eastern Daylight Time)"
        },
        {
			userID: "userID2",
			name: "MGAs Next Generation Web3 Rewards Program",
			description: "",
			campaignType: "encouragePurchases",
			ongoing: false,
			startDate: "2022-05-11T04:00:00.000Z",
			endDate: "2023-05-24T04:00:00.000Z",
            valueGenerated: 0,
            avgOrderPrice: 0,
            rewardRevenue: 0,
            numberOfParticipants: 0,
            newMembers: 0,
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
		},
        {
            "name": "Test Campaign for Social Rewards Uploader Script",
            "description": "This campaign is for making money. - seeded",
            "campaignType": "encouragePurchases",
            "startDate": "2022-03-01T05:00:00.000Z",
            "endDate": "2022-03-31T04:00:00.000Z",
            "tokenRewardAmount": 0.01,
            "totalFundAmount": 100,
            "instagramFundAmount": 100,
            "twitterFundAmount": 0,
            "facebookFundAmount": 0,
            "hashtags": "#pencils",
            "instagramProfile": "www.insta.com",
            "specialInstructions": "Make sure that you do it right! #ididnothavesexualrelationswiththatwoman or #imnotacrook to get your reward",
            "instagram": {
                "active": true,
                "mentions": {
                    "active": true,
                    "reward": 50,
                    "available": 25,
                    specialInstruction: "mention hashtag #ididnothavesexualrelationswiththatwoman",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                }
            },
            "facebook": {
                "active": true,
                "shares": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "mentions": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "twitter": {
                "active": true,
                "retweets": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                },
                "follows": {
                    "active": true,
                    "reward": 10,
                    "available": 1000,
                    specialInstruction: "",
                },
                "comments": {
                    "active": false,
                    "reward": 0,
                    "available": 0,
                    specialInstruction: "",
                }
            },
            "tiktok": {
                "active": true,
                "follows": {
                    "active": true,
                    "reward": 1,
                    "available": 50,
                    specialInstruction: "",
                },
                "likes": {
                    "active": true,
                    "reward": 10,
                    "available": 50,
                    specialInstruction: "",
                },
                "comments": {
                    "active": true,
                    "reward": 100,
                    "available": 5,
                    specialInstruction: "use #imnotacrook to get your reward",
                }
            },
            "id": "01FYR4XZF4MTADVSMWD3JTKGSQ",
            "userID": "2",
            "brandID": `brandIDForSocialActionsRewardsTest`,
            "remainingBudget": 100,
            "valueGenerated": 0,
            "campaignType": "encourageReferrals"
        },
    ],
    /**
     *
     *  model from slack (Thanasi/Cesar)
            id: "rewardID3",
            userID: "brandUserID",
            rewardType: "percentage",
            discountPercent: "-50.0",
            totalRewardInstances: 5,
            totalRedeemedRewardInstances: 1,
            totalRemaining: 4,
            rewardPriceToken: 5000,
            name: "50% Discount Codes",
            description: "Redeemable for 50% off all merchandise",
            soldOut: false,
            userCanAfford: false,
     */
    reward: [
        {
            "brandID": "01G3B3RTP8VAHR4QDV0BC3Z6CF",
            "name": "my reward - seeded",
            "description": "my description - seeded",
            "startDate": "2022-03-01T05:00:00.000Z",
            "endDate": "",
            "discountPercent": "-10",
            "rewardPriceUSD": 123,
            "rewardPriceToken": 1230,
            "ongoing": true,
            "rewardType": "percentage",
            "id": "01FXXCXGHGMNAGW0KGVXG41AAM",
            "userID": "1",
			"rewardRevenue": 0,
			"numberOfParticipants": 0,
			"totalRewardInstances": 10,
			"totalRedeemedRewardInstances": 0,
			"instancesRemaining": 10
        },
        {
            "brandID": "1",
            "name": "my reward - seeded",
            "description": "my description - seeded",
            "startDate": "2022-03-01T05:00:00.000Z",
            "endDate": "",
            "discountPercent": "-50",
            "rewardPriceUSD": 123,
            "rewardPriceToken": 1230,
            "ongoing": true,
            "rewardType": "percentage",
            "id": "01FXXCXGHGMNAGW0KGVXG41Axx",
            "userID": "2",
			"rewardRevenue": 0,
			"numberOfParticipants": 0,
			"totalRewardInstances": 10,
			"totalRedeemedRewardInstances": 0,
			"instancesRemaining": 10
        },
        {
            "brandID": "1",
            "name": "50% off discount - seeded",
            "description": "my description - seeded",
            "startDate": "2022-03-01T05:00:00.000Z",
            "endDate": "",
            "discountPercent": "-50",
            "rewardPriceUSD": 5,
            "rewardPriceToken": 50,
            "ongoing": true,
            "rewardType": "percentage",
            "id": "01FXXCXGHGMNAGW0KGVXG41Ax2",
            "userID": "2",
			"rewardRevenue": 0,
			"numberOfParticipants": 0,
			"totalRewardInstances": 10,
			"totalRedeemedRewardInstances": 0,
			"instancesRemaining": 10
        }
    ],
    userAccount: [
		{ id: `userID11`, email: "consumer1@mgae.com" },
		{ id: "userID3", email: "consumer2@mgae.com" },
		{ id: "userIDForSocialActionsRewardTest1", tiktokUserID: `rnixon`, email: `richard@rnixon.com`  },
		{ id: "userIDForSocialActionsRewardTest2", tiktokUserID: `froosevelt`, email: `franklin@froosevelt.com`  },
		{ id: "userIDForSocialActionsRewardTest3", instagramUserID: `bclinton`, email: `bill@bclinton.com`  },
		{ id: "userIDForSocialActionsRewardTest4", twitterUserID: `rregan`, email: `ronald@rregan.com`  },
        {
            id: `webhookTestUserID`, email: `jon@doe.ca`
        },
        { id: "userID2",
            email: "admin@mgae.com",
            passwordHashed: "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
        },
        {
            "id": "1",
            "email": "active@user.com",
            "name": "Active User",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "isConfirmed": true,
            "numberOfTokens": 10000,
            "instagramUserID": "fake-user",
            "facebookUserID": "fake-user",
            "twitterUserID": "fake-user",
            "tiktokUserID": "fake-user",
            "userType": "widgetUser",
            "tokens":  [{
                brandID: "1",
                balance: 700,
                USDBalance: 1000,
                lastUpdated: `May 20 2022`,
            }]
        },
        {
            "id": "2",
            "email": "dole@time.com",
            "name": "Dole Time",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "isConfirmed": true,
            "numberOfTokens": 10000,
            "instagramUserID": "fake-user",
            "facebookUserID": "fake-user",
            "twitterUserID": "fake-user",
            "tiktokUserID": "fake-user",
            "userType": "brandUser",
            "tokens":  [{
                brandID: "1",
                balance: 700,
                USDBalance: 1000,
                lastUpdated: `May 20 2022`,
            }]
        },
        {
            "id": "3",
            "email": "graham@test.com",
            "name": "Graham the widget Guy",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "isConfirmed": true,
            "numberOfTokens": 10000,
            "instagramUserID": "fake-user",
            "facebookUserID": "fake-user",
            "twitterUserID": "fake-user",
            "tiktokUserID": "fake-user",
            "userType": "widgetUser",
            "tokens":  [{
                brandID: "1",
                balance: 10000,
                USDBalance: 100000,
                lastUpdated: `May 20 2022`,
            }]
        },
        {
            "id": "4",
            "email": "brand@owner.com",
            "name": "Cesar the Brand Owner",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "isConfirmed": true,
            "numberOfTokens": 10000,
            "instagramUserID": "fake-user",
            "facebookUserID": "fake-user",
            "twitterUserID": "fake-user",
            "tiktokUserID": "fake-user",
            "userType": "brandUser",
            "tokens":  [{
                brandID: "1",
                balance: 700,
                USDBalance: 1000,
                lastUpdated: `May 20 2022`,
            }]
        },
        {
            "id": "5",
            "email": "kyle@owner.com",
            "name": "Kyle the Retailer",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "isConfirmed": true,
            "numberOfTokens": 10000,
            "instagramUserID": "fake-user",
            "facebookUserID": "fake-user",
            "twitterUserID": "fake-user",
            "tiktokUserID": "fake-user",
            "userType": "brandUser",
            "tokens":  [{
                brandID: "1",
                balance: 10000,
                USDBalance: 100000,
                lastUpdated: `May 20 2022`,
            }]
        },
        {
            "id": "6",
            "email": "kyle@buyer.com",
            "name": "Kyle the Buyer",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "isConfirmed": true,
            "numberOfTokens": 10000,
            "instagramUserID": "fake-user",
            "facebookUserID": "fake-user",
            "twitterUserID": "fake-user",
            "tiktokUserID": "fake-user",
            "userType": "widgetUser",
            "tokens":  [{
                brandID: "3",
                balance: 10000,
                USDBalance: 100000,
                lastUpdated: `May 20 2022`,
            }]
        },
        {
            "email": "brand@brand.com",
            // bigspender
            "passwordHashed": "$2b$10$blrHcu.9XGlfT0JVKrZtQOg5EomIdU0CZSWh/xBo9x0i2wEyIq4WG",
            "id": "01G3YN98V37SE61T5BWCBTZK73",
            "createdAt": 1653517624164,
            "createdAtFormatted": "Wed May 25 2022 22:27:04 GMT+0000 (Coordinated Universal Time)",
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "userType": "brandOwner",
            "updatedAt": 1653518115820,
            "updatedAtFormatted": "Wed May 25 2022 22:35:15 GMT+0000 (Coordinated Universal Time)",
            "tokens": [
                {
                    "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
                    "balance": 100,
                    "USDBalance": 1000,
                    "lastUpdated": "Fri May 27 2022 22:46:00 GMT+0000 (Coordinated Universal Time)"
                }
            ]
        },
        {
            "name": "graham luke",
            "email": "graham@gmail.com",
            "encryptedEmail": "$2b$10$rxxHuHbooB9pXMZLI.2mL.o1z.ToObl7aIiuJrD0FC2ysk4E8ZT4G",
            "isConfirmed": false,
            "facebookUserID": "",
            "instagramUserID": "",
            "twitterUserID": "",
            "tiktokUserID": "",
            "userType": "widgetUser",
            "tokens": [
                {
                    "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
                    "balance": 100,
                    "USDBalance": 1000,
                    "lastUpdated": "Fri May 27 2022 22:46:00 GMT+0000 (Coordinated Universal Time)"
                }
            ],
            "id": "01G43V5CTAQ0EB3XNTNSVQKEXB",
            "createdAt": 1653691560779,
            "createdAtFormatted": "Fri May 27 2022 22:46:00 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": 1653691560859,
            "updatedAtFormatted": "Fri May 27 2022 22:46:00 GMT+0000 (Coordinated Universal Time)"
        }
    ],
    // this is mock data; the list function will generate this data on the fly
    earnActions: [
        {
            campaignID: "1",
            "campaignType": "encourageReferrals",
            "platform": "facebook",
            "type": "shares",
            "active": true,
            "reward": 1,
            "available": 50,
            specialInstruction: "",
            "description": "Share our Facebook Post",
            "specialInstruction": "do the thing right on Facebook by sharing with #BigHashtagEnergy",
            "instructions": [
                {
                    "type": "text-input",
                    "textContent": "Link your Facebook",
                    "mediaIMGs": []
                },
                {
                    "type": "text",
                    "textContent": "Click \"Share to News Feed\" on the specified post\nand ensure that the audience is set to \"Public\". This ensures that we can find your post and reward your tokens",
                    "mediaIMGs": [
                        "facebook-share-to-feed.png",
                        "facebook-update-privacy.png"
                    ]
                },
                {
                    "type": "text",
                    "textContent": "Within 24 hours of sharing the specified Facebook post, you should receive the reward tokens in your profile!",
                    "mediaIMGs": []
                }
            ]
        },
        {
            "campaignID": "1",
            "campaignType": "encourageReferrals",
            "platform": "instagram",
            "type": "mentions",
            "active": true,
            "reward": 1,
            "available": 50,
            specialInstruction: "",
            "description": "Tag us on your Instagram post",
            "specialInstruction": "do the thing right on Instagram by sharing with #BigHashtagEnergy",
            "instructions": [
                {
                    "type": "text-input",
                    "textContent": "Link your Instagram",
                    "mediaIMGs": []
                },
                {
                    "type": "text",
                    "textContent": "Ensure your \"account privacy\" is set to public. This ensures that we can find your post and reward your tokens",
                    "mediaIMGs": [
                        "instagram-update-privacy.png"
                    ]
                },
                {
                    "type": "text",
                    "textContent": "Within 24 hours of making the post, you should receive the reward tokens in your profile!",
                    "mediaIMGs": []
                }
            ]
        },
        {
            "campaignID": "1",
            "campaignType": "encourageReferrals",
            "platform": "instagram",
            "type": "follows",
            "active": true,
            "reward": 1,
            "available": 50,
            specialInstruction: "",
            "description": "Follow our Instagram profile",
            "specialInstruction": "do the thing right on Instagram by following us at @MGAInstagram",
            "instructions": [
                {
                    "type": "text-input",
                    "textContent": "Link your Instagram",
                    "mediaIMGs": []
                },
                {
                    "type": "text",
                    "textContent": "Ensure your \"account privacy\" is set to public. This ensures that we can find your post and reward your tokens",
                    "mediaIMGs": []
                },
                {
                    "type": "text",
                    "textContent": "Within 24 hours of following our Instagram profile, you should receive the reward tokens in your profile!",
                    "mediaIMGs": []
                }
            ]
        },
        {
            "campaignID": "1",
            "campaignType": "encourageReferrals",
            "platform": "tiktok",
            "type": "follows",
            "active": true,
            "reward": 1,
            "available": 50,
            specialInstruction: "",
            "description": "Follow our TikTok account",
            "specialInstruction": "do the thing right on TikTok by following us at @MGAInstagram",
            "instructions": [
                {
                    "type": "text-input",
                    "textContent": "Link your TikTok",
                    "mediaIMGs": []
                },
                {
                    "type": "text",
                    "textContent": "Within 24 hours of following our TikTok account, you should receive the reward tokens in your profile!",
                    "mediaIMGs": []
                }
            ]
        },
        {
            "campaignID": "1",
            "campaignType": "encourageReferrals",
            "platform": "tiktok",
            "type": "likes",
            "active": true,
            "reward": 1,
            "available": 50,
            specialInstruction: "",
            "description": "Like our TikTok post",
            "specialInstruction": "do the thing right on TikTok by liking our latest post",
            "instructions": [
                {
                    "type": "text-input",
                    "textContent": "Link your TikTok",
                    "mediaIMGs": []
                },
                {
                    "type": "text",
                    "textContent": "Within 24 hours of liking the specified TikTok post, you should receive the reward tokens in your profile!",
                    "mediaIMGs": []
                }
            ]
        }
    ],
    userActivity: [
        {
            userID: `3`,
            tokensGivenOut: 200,
            brandID: `1`,
            source: `encouragePurchases`,
            date: `Jan 10 2022`,
            platform: `shopping`,
            description: 'Bought merchandise',
            isReceived: true, // +200 frontend styling flag: style red for activities that cost the user tokens, and green for activities that gave the user tokens. In this case, +200 tokens
        },
        {
            userID: `3`,
            tokensGivenOut: 100,
            brandID: `1`,
            source: `encourageReferrals`,
            date: `Feb 14 2022`,
            platform: `twitter`,
            action: `follow`,
            description: 'Twitter follow',
            isReceived: true, // styled as +100 tokens
        },
        {
            userID: `3`,
            tokensGivenOut: 1000,
            brandID: `1`,
            date: `March 28 2022`,
            source: `redeemReward`,
            platform: `discount`,
            description: 'Discount Code',
            isReceived: false,  // -1000 here the user is spending 100 tokens to redeem a reward
        }
    ],
    MyActivity: [{
        id: 1,
        description: "Sharing Post",
        socialPlatform: "Instagram",
        socialType: "Liked",
        pointsEarned: 150,
        date: "2022-03-01T05:00:00.000Z",
    }, {
        id: 2,
        description: "Sharing Liked",
        socialPlatform: "Facebook",
        socialType: "Shared",
        pointsEarned: 300,
        date: "2022-04-01T05:00:00.000Z",
    }],
};
