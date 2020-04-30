import { Then } from "cypress-cucumber-preprocessor/steps";

import { data } from './scrape'

Given(`a bc scrape object for today with empty arrays in the database`, async () => {

    /**
     *  Call out to (locally running) backend-lambda process which connects to the database and inserts scraped data.
     * 
     *  (You probably don't need to change this part.)
     */

    const mongoDatabaseName = Cypress.env('mongo_database_name')
    const mongoCollection = Cypress.env('mongo_collection_bc_scraper')
    const saveDataBackendUrl = Cypress.env('backend_save_data_url')

    cy.log('trying to post data... ', data)

    cy.request('POST', saveDataBackendUrl, { collection: mongoCollection, database_name: mongoDatabaseName })
        .then(response => {
            cy.log(response)

            cy.log('response is ', JSON.stringify(response))

            // expect(JSON.stringify(response.body)).to.contain.string('Saved succesfully!')

        }, err => {

            cy.log('err requesting: ', err)

        })


})

Then(`I update the database's bc scrape object for {string} {string} {string}`, async (stockCategory, gainerOrLoser, timeFrame) => {

    /**
     *  Calls out to (locally running) backend-lambda process which connects to the database and inserts scraped data.
     */

    const mongoDatabaseName = Cypress.env('mongo_database_name')
    const mongoCollection = Cypress.env('mongo_collection_bc_scraper')
    const updateBcDataBackendUrl = Cypress.env('backend_update_bc_data_url')
    const shutdownBackendUrl = Cypress.env('shutdown_backend_url')

    cy.log('trying to post data... ', data)

    cy.request('POST', updateBcDataBackendUrl, {
        scraped_data: data,
        collection: mongoCollection,
        database_name: mongoDatabaseName,
        stock_category: stockCategory,
        gainer_or_loser: gainerOrLoser,
        time_frame: timeFrame
    })
        .then(response => {
            cy.log(response)

            cy.log('response is ', JSON.stringify(response))

            // expect(JSON.stringify(response.body)).to.contain.string('Saved succesfully!')

        }, err => {

            cy.log('err requesting: ', err)

        })
})

Then(`I'm done with the backend server.`, () => {

    // cy.log('response is ', JSON.stringify(response.body))

    // expect(JSON.stringify(response.body)).to.contain.string('Saved succesfully!')

    cy.request('POST', Cypress.env('shutdown_backend_url'))
})


