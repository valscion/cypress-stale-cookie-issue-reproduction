describe('issue https://github.com/cypress-io/cypress/issues/25841 reproduction', () => {
  it('does not use stale cookies', () => {
    cy.visit('/page_a')
    cy.contains('FLASH_FROM_REDIRECT_ACTION').should('not.exist')
    cy.contains('REDIRECT_BACK_TO_PAGE_A').click()
    cy.contains('FLASH_FROM_REDIRECT_ACTION').should('be.visible')
    cy.visit('/page_b')
    cy.contains('THIS_SHOULD_BE_VISIBLE_AFTER_BUTTON_CLICK').should('not.exist')

    // Workaround: Clearing the cookies before triggering the fetch request
    // Inspired by the workaround posted by @ksazhnev here:
    // https://github.com/cypress-io/cypress/issues/25841#issuecomment-1807468630
    cy.clearCookies()

    cy.contains('Trigger fetch request').click()
    cy.contains('THIS_SHOULD_BE_VISIBLE_AFTER_BUTTON_CLICK').should('be.visible')
  })
})
