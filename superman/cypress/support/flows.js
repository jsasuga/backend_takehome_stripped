import { login, waitForLoadingToFinish, getURLPrefixForQuinnWithPort } from "./navigation_utils.js";
import { upload_jpeg } from "./utils.js";
import date from 'date-and-time';

export function onboardBrand(shopifyShopURL) {
    var url = `${getURLPrefixForQuinnWithPort()}/brand/onboarding?shopifyShopURL=${shopifyShopURL}`;
    console.log(`visiting onboarding page`);
    cy.visit(url);

    console.log(`clicking get started button`);
    cy.isVisibleAndClick('getStarted_button');

    console.log(`entering info`);

    cy.isVisibleAndInput('fullName_input', "Bob Dole");
    cy.isVisibleAndInput('email_input', "emailtwo@internet.com");
    cy.isVisibleAndInput('password_input', "secretPassword123#");
    cy.isVisibleAndInput('confirmPassword_input', "secretPassword123#");
    cy.isVisibleAndClick('signup_checkbox');
    cy.isVisibleAndClick('next_button');

    // next page
    cy.isVisibleAndInput('brandName_input', "CYPRESS BRAND");
    var desc = "This is the description for my thing.";
    cy.isVisibleAndInput('description_input', desc);
    upload_jpeg(`[data-cy="logo_fileUpload"] input[type="file"]`);

    cy.isVisibleAndClick('.el-color-picker__trigger');
    cy.get('*[id^="el-popper-container"]').find('input').clear().type('#ff0000');
    cy.get('*[id^="el-popper-container"]').find('button').contains('OK').click();

    cy.isVisibleAndClick('next_button');

    // next page - select campaign type
    cy.isVisibleAndClick("encouragePurchases_selection");
    cy.isVisibleAndClick('next_button');

    // next page
    cy.isVisibleAndInput('tokenName_input', "$CYPRESS");
    upload_jpeg(`[data-cy="token_fileUpload"] input[type="file"]`);
    cy.isVisibleAndClick('next_button');

    // final page
    cy.server();
    cy.route('POST', '**/api/**').as('api');
    cy.isVisibleAndClick("launchCultos_button");
    // check that the new page loaded
    cy.isVisible('newCampaign_button');
    // wait for all POSTs to complete (like creating the onboarding model and users)
    cy.wait('@api');

    // should not be able to see password in model
    cy.post("api/onboarding/get", {
        email: "emailtwo@internet.com"
    }).then((response) => {
        // we got the correct model
        expect(response.body.email).to.eq("emailtwo@internet.com");
        // the password has been taken out
        expect(response.body.password).to.eq(undefined);
        expect(response.body.confirmPassword).to.eq(undefined);
    });

    // check that we go to the dashboard
    cy.isVisible("newCampaign_button");

    cy.containsIsVisible("CYPRESS BRAND");
    cy.containsIsVisible(desc);

    // fucking shit
    cy.wait(2000);
}


// Assume that you are logged in. Create a campaign.
//
// name -- name of the campaign
export function createCampaignPurchases(name, isFirstCampaign) {
    cy.isVisibleAndClick("newCampaign_button", null, true);

    if (isFirstCampaign) {
        cy.isVisibleAndClick("configure_button");
    }

    cy.isVisibleAndClick("encouragePurchases_selection");
    cy.isVisibleAndClick("next_button");

    // don't need to configure if it isn't the first campaign
    // cy.isVisibleAndClick("configure_button");
    cy.isVisibleAndInput('name_input', name);
    cy.isVisibleAndInput("[data-cy=startDate_input] input", "2040-05-15");
    cy.isVisibleAndInput("[data-cy=endDate_input] input", "2040-06-15");
    // close the previous selector by clicking somewhere random
    cy.isVisibleAndClick("[data-cy=startDate_input] input");

    cy.isVisibleAndClick("next_button");
    cy.isVisibleAndClick("next_button"); // okay with amounts
    cy.isVisibleAndClick("next_button"); // save
    cy.isVisibleAndClick("viewCampaign_button"); // done

    // our new campaign should be visible
    cy.containsIsVisible(name);

    // // verify that we are on the campaigns page
    cy.isVisible("newCampaign_button");
    waitForLoadingToFinish();
}

export function createCampaignReferrals(name, isFirstCampaign) {
    cy.isVisibleAndClick("newCampaign_button");
    // don't need to configure if it isn't the first campaign
    // cy.isVisibleAndClick("configure_button");

    if (isFirstCampaign) {
        cy.isVisibleAndClick("configure_button");
    }

    cy.isVisibleAndClick("encourageReferrals_selection");
    cy.isVisibleAndClick("next_button");

    cy.isVisibleAndInput('name_input', name);
    cy.isVisibleAndInput('description_input', "This campaign is for making money.");

    cy.isVisibleAndInput("[data-cy=startDate_input] input", date.format(new Date(),'YYYY/MM/DD'));
    cy.isVisibleAndInput("[data-cy=endDate_input] input", "2040-06-15");
    // close the previous selector by clicking somewhere random
    cy.isVisibleAndClick("[data-cy=startDate_input] input");

    cy.isVisibleAndClick("next_button");

    // cy.get("[data-cy=socialSlider_toggle]").first().click();
    // cy.isVisibleAndClick("addPlatformInstagram_button", null, true);
    cy.isVisibleAndClick("addInstagramShares_button", null, true);
    cy.isVisibleAndClick("next_button");

    cy.vSelect("hashtag_input", "pencils", null, null, null, true);
    cy.isVisibleAndInput("instagramProfile_input", "www.insta.com");
    cy.isVisibleAndInput("specialInstructions_input", "Make sure that you do it right!", "first");
    // goto step 4
    cy.isVisibleAndClick("next_button");
    // finish
    cy.isVisibleAndClick("next_button");
    cy.isVisibleAndClick("viewCampaign_button");

    // our new campaign should be visible
    cy.containsIsVisible(name);

    // verify that we are on the campaigns page
    cy.isVisible("newCampaign_button");
}

export function createReward(name, price='1') {
    console.log("[createReward] creating reward");
    cy.isVisibleAndClick("[data-cy=rewards_tab] a.nav-link", null, true);

    console.log("[createReward] looking for new reward button");
    cy.isVisibleAndClick("newReward_button", null, true);

    console.log("[createReward] found it!");
    cy.isVisibleAndClick("templateOne_div");
    cy.isVisibleAndClick("next_button");

    cy.isVisibleAndInput("name_input", name);
    cy.get('[data-cy=rewardPriceUSD_input]').find('input').clear().type(price);
    // cy.isVisibleAndInput("description_input", "Redeemable for 1% off on all merchandise, redeemable at checkout, limit one discount per order.");
    cy.isVisibleAndClick("ongoing_checkbox");
    cy.isVisibleAndInput("[data-cy=startDate_input] input", date.format(new Date(),'YYYY/MM/DD'));
    // deselect the date selector
    cy.isVisibleAndInput("name_input", name);

    cy.isVisibleAndClick("next_button");
    cy.isVisibleAndClick("viewReward_button");

    // cy.isVisible('app_spinner');
    // cy.exists('appSpinnerNotVisible_span');
    cy.wait(1000);

    // we should not need to click this
    cy.isVisibleAndClick("[data-cy=rewards_tab] a.nav-link", null, true);
    cy.containsIsVisible(name);
}
