describe('GET Group data', () => {
  // 1: Login
  it('log in user', () => {
    cy.visit('/login');

    // Enter credentials
    cy.get('input#email').type('user@example.com');
    cy.get('input#password').type('1234');

    // click "Sign in" buttons
    cy.get('button[type="submit"]').click();

    // Test that login worked
    cy.url().should('include', '/authenticatedHome');
  });

  // 2: navigate to user home page and check if group data is visible
  it('navigate to user home page', () => {
    cy.visit("/user/group")

    // ToDo: check if group data is visible
  });

});