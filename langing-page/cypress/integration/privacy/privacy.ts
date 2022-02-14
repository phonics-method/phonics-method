import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import { CONFIG } from '../../../config/config'
import { visitWithCookies, isNotInteractable } from '../cypress-steps';

Given(/^they visit the main page for the first time$/, () => {
  cy.visit('/')
})

Given(/^they visit the main page after privacy consent$/, () => {
  visitWithCookies('/', {
    [CONFIG.cookies.privacyConsent]: '{}',
  })
})

When(/^they choose the privacy policy$/, () => {
  cy.get('[data-test-id="main-footer__privacy-link"]').click()
})

When(/^they choose the highlighted privacy policy$/, () => {
  cy.get('[data-test-id="privacy-consent-dialog__privacy-link"]').click()
})

When(/^they don't decide on the privacy consent$/, () => {})

Then(/^they see the privacy policy$/, () => {
  cy.get('[data-test-id="privacy-policy"]').contains('talk2machine Privacy Policy')
})

Then(/^they can't interact with the rest of the site$/, () => {
  isNotInteractable('[data-test-id="main-content"]')
})

