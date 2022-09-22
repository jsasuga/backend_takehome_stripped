import test from './test.js';
import {image as some_image} from "./big_data/some_image.js";
import domainConfig from "../src/domainConfig.js";

// this file goes along with test.js
//
// this data will simulate a brand onboarding and creating a campaign and a reward. we have this to
// make testing easier.
export default {
    ...test,
    brand: [
        {
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "name": "SEED-BRAND",
            "description": "hi",
            "color": "#409EFF",
            "brandIMG": some_image,
            "tokenName": "$SEED",
            "tokenIMG": some_image,
            "defaultCampaignType": "encouragePurchases",
            "inviteCode": "",
            "shopifyShopURL": domainConfig().storeName,
            "isWidgetEnabled": true,
            "id": "01G3YN98V51GWN92XKDYHH8C8S",
            "createdAt": 1653517624166,
            "createdAtFormatted": "Wed May 25 2022 22:27:04 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": 1653518116140,
            "updatedAtFormatted": "Wed May 25 2022 22:35:16 GMT+0000 (Coordinated Universal Time)"
        },
        ...test.brand,
    ],
    brandPublicDetails: [
        {
            "id": "01G3YN98V51GWN92XKDYHH8C8S",
            "name": "SEED-BRAND",
            "description": "hi",
            "color": "#409EFF",
            "brandIMG": some_image,
            "tokenName": "$SEED",
            "tokenIMG": some_image,
            "shopifyShopURL": domainConfig().storeName,
            isWidgetActivated: true,
        },
    ],
    onboarding: [
        {
            "fullName": "brand",
            "email": "brand@brand.com",
            "brandName": "SEED-BRAND",
            "brandDescription": "this is a brand that we seeded",
            "brandColor": "#409EFF",
            "brandIMG": some_image,
            "tokenName": "$hi",
            "tokenIMG": some_image,
            "agreedToTerms": true,
            "defaultCampaignType": "encouragePurchases",
            "inviteCode": "",
            "shopifyShopURL": domainConfig().storeName,
            "userID": "01G3YN98V37SE61T5BWCBTZK73",
            "id": "01G3YN98XJ007FA2CERG2GGFB6",
            "createdAt": 1653517624244,
            "createdAtFormatted": "Wed May 25 2022 22:27:04 GMT+0000 (Coordinated Universal Time)"
        },
        ...test.onboarding,
    ],
};
