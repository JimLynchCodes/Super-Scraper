import { Then } from "cypress-cucumber-preprocessor/steps";

import { data } from './scrape'

Then(`I save it in my database's Google-Theme-Scrapings collection`, async () => {

    /**
     *  Call out to (locally running) backend-lambda process which connects to the database and inserts scraped data.
     * 
     *  (You probably don't need to change this part.)
     */

    // const mongoCollection = Cypress.env('google_themes_mongo_collection')
    // const saveDataBackendUrl = Cypress.env('backend_save_data_url')
    // const shutdownBackendUrl = Cypress.env('shutdown_backend_url')

    // cy.request('POST', saveDataBackendUrl, { scraped_data: data, collection: mongoCollection })
    //     .then(response => {

    //         cy.log('response is ', JSON.stringify(response.body))

    //         expect(JSON.stringify(response.body)).to.contain.string('Saved succesfully!')

    //         cy.request('POST', shutdownBackendUrl)

    //     })

})

