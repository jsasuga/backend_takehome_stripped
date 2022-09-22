export function shopifyDevStoreLogin(devStoreURL, devStorePassword) {
    cy.visit(devStoreURL);
    cy.get('#password').type(devStorePassword);
    cy.get('[type=submit]').click();
    cy.wait(1000);
}

export function shopifyCustomerLogin(storeURL, customerEmail, customerPassword) {
    cy.visit('https://' + storeURL + '/account/login');
    cy.get('#CustomerEmail').type(customerEmail);
    cy.get("#CustomerPassword").type(customerPassword);
    cy.get("#customer_login").submit();
    cy.url().should('not.contain', '/login');
}
