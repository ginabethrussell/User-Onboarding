describe('Form Tests', function(){
    beforeEach(function(){
        cy.visit('http://localhost:3000')
    })
 
    it('test form inputs and submission', function () {
   

        cy.get('[data-cy=name]')
            .type('Lambda Student')
            .should('have.value', 'Lambda Student');

        cy.get('[data-cy=email]')
            .type('lambda-student@gmail.com')
            .should('have.value', 'lambda-student@gmail.com');

        cy.get('[data-cy=password]')
            .type('123456')
            .should('have.value', '123456');

        cy.get('[data-cy=terms]')
            .check()
            .should('be.checked');

        cy.get('[data-cy=role]')
            .select('Front End Developer I')

        cy.get('[data-cy=submit]')
            .click()
    });

    it('check form validation when email input is empty', function(){
        
        cy.get('[data-cy=name]')
            .type('Lambda Student')
            .should('have.value', 'Lambda Student');

        cy.get('[data-cy=password]')
            .type('123456')
            .should('have.value', '123456');

        cy.get('[data-cy=role]')
            .select('Front End Developer I')

        cy.get('[data-cy=terms]')
            .check()
            .should('be.checked');

        cy.get('[data-cy=submit]')
            .should('be.disabled');

    })
})