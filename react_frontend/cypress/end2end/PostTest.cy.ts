describe('Create Image-Post', () => {
    // 1: Login
    it('log in user', () => {
        cy.visit('/login');

        // Enter credentials
        cy.get('input#email').type('admin@example.com');
        cy.get('input#password').type('1234');

        // click "Sign in" button
        cy.get('button[type="submit"]').click();

        // Test that login worked
        cy.url().should('include', '/authenticatedHome');
    });

    // 2: navigate to
    it('navigate to admin home page', () => {
        cy.visit("/admin/groups")
        cy.get('[id="createButton"]').contains('Create Group').click();
        cy.url().should('include', '/create');
    });

    // 3: Create group
    it('fill in the group form and submit it', () => {
        cy.get('textarea#name').type('Test Name');
        cy.get('textarea#motto').type('Test Motto');
        cy.get('input#logo').type('https://example.com/testImage.jpg');

        // click "create group" button
        cy.get('button[type="submit"]').click();

        // request alert
        cy.on('window:alert', (str) => {
            expect(str).to.equal('Group created successfully');
        });

        cy.url().should('include', '/admin/groups');
    });

    // 4: Test that group was created
    it('verify post was created', () => {
        cy.visit('/admin/groups');

        // Test that name, motto and image is visible
        cy.contains('Test Name').should('exist');
        cy.contains('Test Motto').should('exist');
        cy.get('img').should('have.attr', 'src', 'https://example.com/testImage.jpg');
    });
});