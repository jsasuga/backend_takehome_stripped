import domainConfig from "../src/domainConfig.js";

export default {
    merchantConfig: [
        {
            shopifyShopURL:  'cultosdev.myshopify.com',
            shopifyAccessToken: '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'
        },
        {
            shopifyShopURL: 'cultosapptest.myshopify.com',
            shopifyAccessToken: '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'
        },
        {
            shopifyShopURL: 'dummyShopURL',
            shopifyAccessToken: 'bogus'
        },
        {
            "brandID": "01G3YN98V51GWN92XKDYHH8C8S",
            "shopifyShopURL": domainConfig().storeName,
            "shopifyAccessToken": domainConfig().token,
            "id": "01G36S337CSF161TRPMB17K8WD",
            "createdAt": 1652716309740,
            "createdAtFormatted": "Mon May 16 2022 15:51:49 GMT+0000 (Coordinated Universal Time)",
            "updatedAt": 1652721617143,
            "updatedAtFormatted": "Mon May 16 2022 17:20:17 GMT+0000 (Coordinated Universal Time)"
        },
        {
            "brandID": "brandID1",
            "shopifyShopURL": `fake-test-store-for-rewardInstanceBelongingToUser-unit-tests.myshopify.com`,
            "shopifyAccessToken": `fake-test-store-for-rewardInstanceBelongingToUser-unit-tests.myshopify.com`,
        }
    ],
    widgetConfig: [
        {
            widgetUUID: domainConfig().widget_uuid,
        }
    ],
};
