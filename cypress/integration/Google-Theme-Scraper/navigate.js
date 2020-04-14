import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://google.com'

Given(`I open Google search home page`, (title) => {
  cy.visit(url)
})
