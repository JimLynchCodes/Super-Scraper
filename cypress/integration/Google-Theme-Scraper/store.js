import { Then } from "cypress-cucumber-preprocessor/steps";

import { data } from './scrape'

Then(`I save it in my database's Google-Theme-Scrapings collection`, (title) => {

    cy.log('data to store is: ', data)

    cy
        .request('POST', 'http://localhost:3000/dev/save', { scraped_data: data })
        .then((response) => {


            cy.log('response is ', JSON.stringify(response.body))

            expect(JSON.stringify(response.body)).to.contain.string('Saved succesfully!') 
        })

})

