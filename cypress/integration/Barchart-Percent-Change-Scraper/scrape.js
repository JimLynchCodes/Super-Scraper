import { When } from "cypress-cucumber-preprocessor/steps";

export let data = {}

When(`I scrape the {string} {string} for {string} on the {string}, new data: {string}`, async (stockCategory, gainerOrLoser, timeFrame, tableView, newData) => {

    if (newData === 'true') {
        data = {}
    }

    // console.log('current mem: ', process.memoryUsage())
    // console.log('current mem: ', process.memoryUsage().rss / 1024 / 1024)

    /**
     *  Place code for grabbing data here
     *  
     *  When finished, assign the scraped data to the exported "data" variable. 
     */

    // X out of modal if it appears...
    cy.get('body').then((body) => {
        if (body.find('.bc-modal-content', { timeout: 1500 }).length > 0) {
            cy.get('.bc-modal-content i.bc-glyph-times').click({ force: true })
        }
    });

    // Sort Chart Alphabetically by "Name" (So that we can match up the main view and technical view)
    cy.get('th:contains(Symbol)', { timeout: 2000 }).click()

    cy.get('table').find('tr').then(($tables) => {

        cy.log('\n Tables Rows found: ', $tables.length)

        if (data[stockCategory] === undefined)
            data[stockCategory] = {}

        if (data[stockCategory][gainerOrLoser] === undefined)
            data[stockCategory][gainerOrLoser] = {}

        cy.log('is timeframe undefined? ', data[stockCategory][gainerOrLoser][timeFrame] === undefined)

        if (data[stockCategory][gainerOrLoser][timeFrame] === undefined)
            data[stockCategory][gainerOrLoser][timeFrame] = []

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