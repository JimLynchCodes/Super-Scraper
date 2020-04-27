import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://google.com'

Given(`I open Google search home page`, (title) => {

  /**
   *  Place code for navigating to the webpage containing the data to be scraped.
   */

  cy.visit(url)

})
