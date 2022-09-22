describe("/admin/seed_data", function() {
    before(function () {
        cy.post('test/clear-db');
    });

    it("can seed with test data", function() {
        cy.post('admin/seed_data/test').then(res => {
            expect(res.status).to.eq(200);
        });
    });

    it('can get the data that we seeded', function() {
        cy.post('api/onboarding/get', {
            fullName: "Bob Dole"
        }).then(res => {
            expect(res.status).to.eq(200);
            expect(res.body.fullName).to.eq("Bob Dole");
        });
    });
});
