import { When } from "cypress-cucumber-preprocessor/steps";

export let data = ''

When(`I add {int} and {int}`, async (int1, int2) => {

    console.log('ok when ', int1, ' ', int2)
    /**
     *  Place code for grabbing and possibly modifying, adding calcualtions, etc. to the data being scraped.
     * 
     *  Assign the final scraped data string or object to the exported field, `data`. 
     */

    // cy.wait(5000)

    cy.get('table').find('tr').then(($tables) => {

        // console.log('cells: ', $tables[1]['cells'][5]['innerText'])
        // cy.log('tr\'s: ', $tables)
        // cy.log('tr\'s type: ', typeof $tables)

        // if ($tables) {

        //     // data = $imgs[0]['alt']

        //     cy.log('Scraped the table 1: ', $tables.children())

        //     // $tables.children().forEach(element => {
        //     //     console.log('el ', element)
        //     //     console.log('el ', JSON.stringify(element))
            // });


            /**
             *   barcahrt.com main view:
             *   Symbol	Name	Last	Change	%Chg 	High	Low	Volume	Avg Vol	Time	Links  
             * 
             *    barchart.com technical view:
             * 
             */
            

            cy.log('Scraped row 0:\n', JSON.stringify($tables[0]['cells']))
            cy.log('\n', $tables[0]['cells'][0]['innerText'])
            cy.log('\n -- Name: ', $tables[0]['cells'][1]['innerText'])
            cy.log('\n', $tables[0]['cells'][2]['innerText'])
            cy.log('\n', $tables[0]['cells'][3]['innerText'])
            cy.log('\n', $tables[0]['cells'][4]['innerText'])
            cy.log('\n', $tables[0]['cells'][5]['innerText'])
            cy.log('\n', $tables[0]['cells'][6]['innerText'])
            cy.log('\n', $tables[0]['cells'][7]['innerText'])
            cy.log('\n\n\n\n\n')
            
            cy.log('Scraped row 1:\n', JSON.stringify($tables[1]))
            cy.log('\n', $tables[1]['cells'][0]['innerText'])
            cy.log('\n', $tables[1]['cells'][1]['innerText'])
            cy.log('\n', $tables[1]['cells'][2]['innerText'])
            cy.log('\n', $tables[1]['cells'][3]['innerText'])
            cy.log('\n', $tables[1]['cells'][4]['innerText'])
            cy.log('\n', $tables[1]['cells'][5]['innerText'])
            cy.log('\n', $tables[1]['cells'][6]['innerText'])
            cy.log('\n', $tables[1]['cells'][7]['innerText'])
            cy.log('Scraped row 2:\n', JSON.stringify($tables[2]))
            // cy.log('Scraped the table 3: ', JSON.stringify($tables))
            cy.log('\n', $tables[2]['cells'][0]['innerText'])
            
            cy.log('\n', $tables[2]['cells'][1]['innerText'])
            
            cy.log('\n', $tables[2]['cells'][2]['innerText'])
            
            cy.log('\n', $tables[2]['cells'][3]['innerText'])
            
            cy.log('\n', $tables[2]['cells'][4]['innerText'])
            // } else {
                cy.log('\n', $tables[2]['cells'][5]['innerText'])
                //     throw new Error('No tables found...')
                cy.log('\n', $tables[2]['cells'][6]['innerText'])
                // }
                cy.log('\n', $tables[2]['cells'][7]['innerText'])

    })

})