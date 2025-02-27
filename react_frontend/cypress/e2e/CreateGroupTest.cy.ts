describe('CREATE Group', () => {
  beforeEach(() => {
      cy.visit('/login');

      // Enter credentials
      cy.get('input#email').type('admin@example.com');
      cy.get('input#password').type('1234');

      // click "Sign in" button
      cy.get('button[type="submit"]').click();

      // Test that login worked
      cy.url().should('include', '/authenticatedHome');
  })

  // 2: Show groups before
  it('show groups before adding a new one', () => {
    cy.visit('/admin/groups');
    cy.get('[id="nextButton"]').click();
  });

  // 3: Create new group
  it('navigate to group page', () => {
    cy.visit('/admin/groups');
    cy.get('[id="createButton"]').click();
    cy.url().should('include', '/create');

    cy.get('input#groupName').type('My Group Name');
    cy.get('input#motto').type('Our Motto');
    cy.get('input#logo').type('https://example.com/logo.png');

    // click "create group" button
    cy.get('button#submitGroup').click();

    cy.url().should('include', '/admin/groups');
  });

  // 4: Test that group was created
  it('verify post was created', () => {
    cy.visit('/admin/groups');
    cy.get('[id="nextButton"]').click();
  });
});