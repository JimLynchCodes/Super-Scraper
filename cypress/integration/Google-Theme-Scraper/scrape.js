import { When } from "cypress-cucumber-preprocessor/steps";

export let data = ''

When(`I scrape the day's theme of the day's google image`, async (title) => {

    /**
     *  Place code for grabbing and possibly modifying, adding calcualtions, etc. to the data being scraped.
     * 
     *  Assign the final scraped data string or object to the exported field, `data`. 
     */

    cy.get('img').then(($imgs) => {

        cy.log($imgs)

        if ($imgs) {

            data = $imgs[0]['alt']

            cy.log('Scraped the img tag\'s "alt" value: ', data)

        } else {
            throw new Error('No images found...')
        }

    })

})