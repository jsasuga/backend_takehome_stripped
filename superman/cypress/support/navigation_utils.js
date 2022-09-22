function getProtocol() {
    return Cypress.env('STACK_PROTOCOL') || "http";
}

export function getURLPrefix() {
    var protocol = getProtocol();
    var ip = Cypress.env('STACK_IP') || "localhost";
    console.log('getURLPrefix', ip);
    return `${protocol}://${ip}`;
}

export function getURLPrefixForQuinnWithPort() {
    var port = "3030";
    var protocol = getProtocol();
    if (protocol == "https") {
        port = "443";
    }
    return `${getURLPrefix()}:${port}`;
}

export function getURLPrefixForSupermanWithPort() {
    var port = "1938";
    var protocol = getProtocol();
    if (protocol == "https") {
        port = "443";
    }
    return `${getURLPrefix()}:${port}`;
}

export function waitForLoadingToFinish() {
    // cy.isVisible('app_spinner');
    // cy.exists('appSpinnerNotVisible_span');
    cy.wait(1500);
}

export function login(email, password) {
    return cy.fixture('app').then((app) => {
        var url = `${getURLPrefixForQuinnWithPort()}/login`;
        cy.visit(url);
        cy.isVisible('input-email');

        // set up a glob for the URL
        cy.server();
        cy.route('POST', '**/api/**').as('api');

        cy.fixture('app').then((app) => {
            const loginEmail = email || app.loginEmail;
            const loginPassword = password || app.loginPassword;
            cy.vInput('input-email', loginEmail);
            cy.vInput('input-password', loginPassword);
        });

        cy.vClick('btn-login');

        // debouncedWait();
        // we logged in!

        // verify that the dashboard loads
        cy.isVisible('campaigns_tab');
        cy.isVisible('currentTokenPrice_div');
        cy.isVisible('newCampaign_button');

        waitForLoadingToFinish();
    });
}
