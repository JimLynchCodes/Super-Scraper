import { When } from "cypress-cucumber-preprocessor/steps";

export let data = {}

When(`I scrape the {string} {string} for {string} on the {string}, new data: {string}`, async (stockCategory, gainerOrLoser, timeFrame, tableView, newData) => {

    // Control if you want to build up the data object over many "When"s
    if (newData === 'true') {
        data = {}
    }

    /**
     *  Place code for grabbing and possibly modifying, adding calcualtions, etc. to the data being scraped.
     *  Assign the final scraped data string or object to the exported field, `data`. 
     */

    // Sort Chart Alphabetically by "Name" (So that we can match up the main view and technical view)
    cy.get('th:contains(Symbol)').click()

    cy.get('table').find('tr').then(($tables) => {

        cy.log('\n Tables Rows found: ', $tables.length)

        cy.log('data1 ', data)

        if (data[stockCategory] === undefined) {
            data[stockCategory] = {}
        }

        cy.log('data2 ', data)

        if (data[stockCategory][gainerOrLoser] === undefined) {
            data[stockCategory][gainerOrLoser] = {}
        }

        cy.log('data3 ', data)

        cy.log('is timeframe undefined? ', data[stockCategory][gainerOrLoser][timeFrame] === undefined)

        if (data[stockCategory][gainerOrLoser][timeFrame] === undefined)
            data[stockCategory][gainerOrLoser][timeFrame] = []

        cy.log('data4 ', data)

        for (let i = 0; i < $tables.length; i++) {

            const newRow = []

            for (let j = 0; j < $tables[i]['cells'].length; j++) {

                const cellValue = $tables[i]['cells'][j]['innerText']

                newRow.push(cellValue)
            }

            const existingRow = data[stockCategory][gainerOrLoser][timeFrame][i]

            if (existingRow === undefined) {
                data[stockCategory][gainerOrLoser][timeFrame].push(newRow)
            }
            else {
                // Combines main view and technical view if one already exists
                data[stockCategory][gainerOrLoser][timeFrame][i] = [
                    ...data[stockCategory][gainerOrLoser][timeFrame][i],
                    ...newRow
                ]
            }

        }

        cy.log('done scraping:')
        cy.log(data)

    })

})