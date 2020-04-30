import { Given, Then } from "cypress-cucumber-preprocessor/steps";

const url = 'https://google.com'

Given(`I open Google search home page`, (title) => {

  /**
   *  Place code for navigating to the webpage containing the data to be scraped.
   */

  cy.visit(url)

})

Then(`I'm done with the backend server.`, () => {
  const shutdownBackendUrl = Cypress.env('shutdown_backend_url')
  cy.request('POST', shutdownBackendUrl)
})
