describe('Form Tests', function(){
    it('visit main page', function () {
        cy.visit('http://localhost:3000')
        .should('include', 'localhost')
    })
})