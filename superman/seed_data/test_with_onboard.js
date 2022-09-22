import test from './test.js';
import { image as some_image } from "./big_data/some_image.js";
import test_with_onboard_but_no_campaigns_or_rewards  from "./test_with_onboard_but_no_campaigns_or_rewards.js";
import domainConfig from "../src/domainConfig.js";

// this file goes along with test.js
//
// this data will simulate a brand onboarding and creating a campaign and a reward. we have this to
// make testing easier.
export default {
    ...test_with_onboard_but_no_campaigns_or_rewards,
    campaign: [
        {
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "name": "Purchase Camp",
            "description": "",
            "campaignType": "encouragePurchases",
            "ongoing": true,
            "startDate": "2022-05-25T04:00:00.000Z",
            "endDate": "",
            "tokenRewardAmount": 0.01,
            "tokenRewardMaxAmount": 0,
            "tokenRewardUseMaxAmount": false,
            "tokenMonthlyBudget": 100,
            "totalFundAmount": 250,
            "instagramFundAmount": 100,
            "twitterFundAmount": 0,
            "facebookFundAmount": 50,
            "tiktokFundAmount": 100,
            "hashtags": [],
            "instagramProfile": "",
            "facebookProfile": "",
            "twitterProfile": "",
            "specialInstructions": "",
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
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "id": "01G3YNMYARBJCW4BDTZZBXH7AP",
            "createdAt": 1653518006617,
            "createdAtFormatted": "Wed May 25 2022 22:33:26 GMT+0000 (Coordinated Universal Time)"
        },
        {
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "name": "Referral Campaign",
            "description": "hi",
            "campaignType": "encourageReferrals",
            "ongoing": true,
            "startDate": "2022-05-25T04:00:00.000Z",
            "endDate": "",
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
                "#pencil"
            ],
            "instagramProfile": "insta",
            "facebookProfile": "face",
            "twitterProfile": "twit",
            "specialInstructions": "hi",
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
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "id": "01G3YNNY06HT6J7VFNPHQ5YS7N",
            "createdAt": 1653518039047,
            "createdAtFormatted": "Wed May 25 2022 22:33:59 GMT+0000 (Coordinated Universal Time)"
        },
        {
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "name": "Referral Campaign That Hasn't Started Yet",
            "description": "hi",
            "campaignType": "encourageReferrals",
            "ongoing": true,
            "startDate": "3000-05-25T04:00:00.000Z",
            "endDate": "",
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
                "#pencil"
            ],
            "instagramProfile": "insta",
            "facebookProfile": "face",
            "twitterProfile": "twit",
            "specialInstructions": "hi",
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
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "createdAt": 1653518039047,
            "createdAtFormatted": "Wed May 25 2022 22:33:59 GMT+0000 (Coordinated Universal Time)"
        },
        ...test.campaign,
    ],
    reward: [
        {
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "name": "A Reward",
            "description": "",
            "rewardType": "percentage",
            "discountPercent": 1,
            "redeemValue": 0,
            "totalRewardInstances": 1,
            "totalRedeemedRewardInstances": 0,
            "rewardPriceUSD": 5,
            "rewardPriceToken": 50,
            "startDate": "2022-05-27T04:00:00.000Z",
            "endDate": "",
            "ongoing": true,
            "instancesRemaining": 1,
            "rewardRevenue": 0,
            "numberOfParticipants": 0,
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "id": "01G43RRRCQ9Y2ZAESNX7Q8A7D1",
            "createdAt": 1653689049496,
            "createdAtFormatted": "Fri May 27 2022 22:04:09 GMT+0000 (Coordinated Universal Time)"
        },
        {
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "name": "A Reward That Has Ended",
            "description": "",
            "rewardType": "percentage",
            "discountPercent": 1,
            "redeemValue": 0,
            "totalRewardInstances": 1,
            "totalRedeemedRewardInstances": 0,
            "rewardPriceUSD": 5,
            "rewardPriceToken": 50,
            "startDate": "2022-05-27T04:00:00.000Z",
            "endDate": "2022-05-28T04:00:00.000Z",
            "ongoing": false,
            "instancesRemaining": 1,
            "rewardRevenue": 0,
            "numberOfParticipants": 0,
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "createdAt": 1653689049496,
            "createdAtFormatted": "Fri May 27 2022 22:04:09 GMT+0000 (Coordinated Universal Time)"
        },
        ...test.reward,
    ],
};
