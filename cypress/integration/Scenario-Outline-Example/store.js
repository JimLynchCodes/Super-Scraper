import { Then } from "cypress-cucumber-preprocessor/steps";

import { data } from './scrape'

Then(`I verify that the result is equal the {int}`, async (table) => {

    // console.log('then ', table)
    /**
     *  Call out to (locally running) backend-lambda process which connects to the database and inserts scraped data.
     * 
     */

    const mongoCollection = Cypress.env('mongo_collection')
    const saveDataBackendUrl = Cypress.env('backend_save_data_url')
    const shutdownBackendUrl = Cypress.env('shutdown_backend_url')

    // cy.request('POST', saveDataBackendUrl, { scraped_data: data, collection: mongoCollection })
    //     .then(response => {

    //         cy.log('response is ', JSON.stringify(response.body))

    //         expect(JSON.stringify(response.body)).to.contain.string('Saved succesfully!')

    //         cy.request('POST', shutdownBackendUrl)

    //     })

})

