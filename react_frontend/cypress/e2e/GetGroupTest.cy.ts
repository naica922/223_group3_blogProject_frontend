describe('GET Group data', () => {
  beforeEach(() => {
    cy.visit('/login');

    // Enter credentials
    cy.get('input#email').type('user2@example.com');
    cy.get('input#password').type('1234');

    // click "Sign in" button
    cy.get('button[type="submit"]').click();

    // Test that login worked
    cy.url().should('include', '/authenticatedHome');
  })

  // 1: Navigate to user group page
  it('visit group data', () => {
    cy.visit('/user/group');
  });
});
