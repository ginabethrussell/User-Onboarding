describe('Form Tests', function(){
    beforeEach(function(){
        cy.visit('http://localhost:3000')
    })

    it('should have correct components displayed and submit button disabled on initial load ', function(){
        cy.get('[data-cy=form]').should('exist');
        cy.get('[data-cy=teamMembers]').should('not.exist');
        cy.get('[data-cy=submit]')
            .should('be.disabled');
        
    })
    // Happy Path
    it('should allow the user to fill in all inputs and submit form', function () {
        cy.get('[data-cy=name]')
            .type('Lambda Student')
            .should('have.value', 'Lambda Student');

        cy.get('[data-cy=email]')
            .type('lambda-student@gmail.com')
            .should('have.value', 'lambda-student@gmail.com');

        cy.get('[data-cy=password]')
            .type('123456')
            .should('have.value', '123456');

        cy.get('[data-cy=role]')
            .select('Front End Developer I')
            .should('have.value','Front End I' )
        
        cy.get('[data-cy=terms]')
            .check()
            .should('be.checked');

        cy.get('[data-cy=submit]')
            .click()
        
        cy.get('[data-cy=name]')
            .should('have.value', '');

        cy.get('[data-cy=email]')
            .should('have.value', '');

        cy.get('[data-cy=password]')
            .should('have.value', '');
        
        cy.get('[data-cy=role]')
            .should('have.value','' )
        
        cy.get('[data-cy=teamMembers]').should('exist');
    });

    // Check for all errors to be displayed
    it('should display correct error messages with invalid inputs', () => {

        cy.get('[data-cy=name]')
        .type('124&(*&*(Z^')
        cy.get(`[data-cy=nameError]`)
        .contains('Name must only contain letters and spaces.')

        cy.get('[data-cy=name]').clear()
        cy.get(`[data-cy=nameError]`)
        .contains('Name is required.')

        cy.get('[data-cy=email')
        .type('waffles@syrup.com')
        cy.get(`[data-cy=emailError]`)
        .contains('That email is already taken.')

        cy.get('[data-cy=email')
        .clear().type('123')
        cy.get(`[data-cy=emailError]`)
        .contains('Please enter a valid email.')

        cy.get('[data-cy=email')
        .clear()
        cy.get(`[data-cy=emailError]`)
        .contains('Email is required.')

        cy.get('[data-cy=password]')
        .type('123')
        cy.get(`[data-cy=passwordError]`)
        .contains('Password must contain 6 characters.')

        cy.get('[data-cy=password]')
        .clear()
        cy.get(`[data-cy=passwordError]`)
        .contains('Password is required.')

        cy.get('[data-cy=role]')
        .select('Front End I').select('')
        cy.get('[data-cy=roleError]')
        .contains('Please select a role.')


    })
})