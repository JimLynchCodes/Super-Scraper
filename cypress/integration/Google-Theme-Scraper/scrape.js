import { When } from "cypress-cucumber-preprocessor/steps";
// import { data } from './data'

export let data = ''

When(`I scrape the day's theme of the day's google image`, async (title) => {

    cy.get('img').then(($imgs) => {

        // console.log(text)
        cy.log($imgs)

        if ($imgs) {
            cy.log('imgs exist!')
            cy.log($imgs.length)

            cy.log($imgs[0]['alt'])
            
            data = $imgs[0]['alt']
            cy.log(data)

        } else {
            cy.log('images are null...')
            cy.log($imgs)
        }

    })

    /** 
    *  Doesn't work with regular promises?
    */
    // const imgs = await cy.get('img')

})