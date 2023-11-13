describe('issue https://github.com/cypress-io/cypress/issues/25841 reproduction', () => {
  it('does not use stale cookies', () => {
    cy.visit('/page_a')
    cy.contains('FLASH_FROM_REDIRECT_ACTION').should('not.exist')
    cy.contains('REDIRECT_BACK_TO_PAGE_A').click()
    cy.contains('FLASH_FROM_REDIRECT_ACTION').should('be.visible')
    cy.visit('/page_b')
    cy.contains('THIS_SHOULD_BE_VISIBLE_AFTER_BUTTON_CLICK').should('not.exist')

    // Workaround odea by @ksazhnev
    // https://github.com/cypress-io/cypress/issues/25841#issuecomment-1807468630
    //
    // However, this requires clicking the button twice.
    cy.intercept('POST', '/set_the_flash').as('firstRequest')
    cy.contains('Trigger fetch request').click()
    cy.wait('@firstRequest').then((interception) => {
      // Delete all cookies after sending the request
      cy.clearCookies();
    })
    // --- end of workaround.

    cy.contains('Trigger fetch request').click()
    cy.contains('THIS_SHOULD_BE_VISIBLE_AFTER_BUTTON_CLICK').should('be.visible')
  })
})
