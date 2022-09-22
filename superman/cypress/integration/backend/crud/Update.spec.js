describe("Get and Create and List", function() {
    before(function () {
        cy.post('test/reseed-db/test');
    });

    it('model with fullName does not exist', function() {
        // this model doesn't exist
        cy.post('api/DoesNotExist/update', {
            fakeProperty: "some value"
        }).then(res => {
            expect(res.status).to.eq(500, "wrong status code");
            expect(res.body.error).not.to.eq(undefined);
        });
    });

    it('model with ID does not exist', function() {
        // this model doesn't exist
        cy.post('api/onboarding/update', {
            id: "2",
            fullName: "test - updated"
        }).then(res => {
            expect(res.status).to.eq(500, "wrong status code");
            expect(res.body.error).not.to.eq(undefined);
        });
    });

    it('update model', function() {
        // make sure the model is the original version
        cy.post('api/onboarding/get', {
            id: '01G1PFMN2NVHREPBHRRN6PMYXH'
        }).then(res => {
            expect(res.body.fullName).to.eq("Bob Dole");
        });

        cy.post('api/onboarding/update', {
            id: '01G1PFMN2NVHREPBHRRN6PMYXH',
            fullName: "test - updated"
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.error).to.eq(undefined);
        });

        // check that the model is the new version
        cy.post('api/onboarding/get', {
            id: '01G1PFMN2NVHREPBHRRN6PMYXH',
        }).then(res => {
            expect(res.body.fullName).to.eq("test - updated");
        });
    });

    it('update only some properties', function() {
        cy.post('api/onboarding/update', {
            id: '01G1PFMN2NVHREPBHRRN6PMYXH',
            fullName: "???"
        }).then(res => {
            expect(res.status).to.eq(200, "wrong status code");
            expect(res.body.error).to.eq(undefined);
        });

        cy.post('api/onboarding/get', {
            id: '01G1PFMN2NVHREPBHRRN6PMYXH',
        }).then(res => {
            // this prop changes
            expect(res.body.fullName).to.eq("???");
            // this one stays the same
            expect(res.body.email).to.eq("email@internet.com");
            expect(res.body.updatedAtFormatted).to.not.eq("");
            expect(res.body.updatedAtFormatted).to.not.eq(undefined);
        });
    });
});
