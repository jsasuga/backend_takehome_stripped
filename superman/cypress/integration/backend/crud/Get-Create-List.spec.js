describe("Get and Create and List", function() {
    before(function () {
        cy.post('test/clear-db');
    });

    it("get on-boarding model - should fail", function() {
        // this model doesn't exist
        cy.post('api/BrandOnboarding/get', {
            fakeProperty: "some value"
        }).then(res => {
            expect(res.status).to.eq(500, "wrong status code");
            expect(res.body.error).not.to.eq(undefined);
        });
    });
    it("create on-boarding model", function() {
        cy.post('api/BrandOnboarding/create', {
            fakeProperty: "some value",
            modelCount: 1,
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.id).not.to.eq(undefined);
            expect(res.body.id.length).not.to.eq(0);
        });
    });
    it("get on-boarding model - should succeed", function() {
        // get the model we made in the previous test
        cy.post('api/BrandOnboarding/get', {
            fakeProperty: "some value"
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.fakeProperty).to.eq("some value");
            expect(res.body.id).not.to.eq(undefined);
            expect(res.body.id.length).not.to.eq(0);
            expect(res.body.createdAtFormatted).not.to.eq("");
            expect(res.body.createdAtFormatted).not.to.eq(undefined);
        });
    });
    it('list models - expect one', function() {
        cy.post('api/BrandOnboarding/list', {}).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.length).to.eq(1);
            expect(res.body[0].modelCount).to.eq(1);
        });
    });
    it("create a second model then try to get a model with no search params - should fail", function() {
        cy.post('api/BrandOnboarding/create', {
            fakeProperty: "some value",
            property: "blob",
            modelCount: 2,
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
        });
        // this should fail because the search returns more than one result
        cy.post('api/BrandOnboarding/get', {}).then(res => {
            expect(res.status).to.eq(500, "wrong status code");
        });
    });
    it('list models - expect two', function() {
        cy.post('api/BrandOnboarding/list', {}).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.length).to.eq(2);
            expect(res.body[0].modelCount).to.eq(1);
            expect(res.body[1].modelCount).to.eq(2);
        });
    });
    it('list models - use search params', function() {
        cy.post('api/BrandOnboarding/list', {
            fakeProperty: "some value",
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.length).to.eq(2);
        });
        cy.post('api/BrandOnboarding/list', {
            fakeProperty: "some value",
            modelCount: 1,
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.length).to.eq(1);
        });
    });
    it('list models - expect none', function() {
        cy.post('api/NonExistentModel/list', {}).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.length).to.eq(0);
        });
    });
});
