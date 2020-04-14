import { Then } from "cypress-cucumber-preprocessor/steps";
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

Then(`I save it in my database's Google-Theme-Scrapings collection`, (title) => {

    const mongoUri = Cypress.env('MONGO_URI')

    cy.log('env: ', mongoUri)

    return new Promise(resolve => {

        cy.log('connecting to: ', mongoUri)

        MongoClient.connect(mongoUri, (err, db) => {
            
            cy.log('connected!')
            
            resolve()

            if (err) {

                cy.log('Error! ', JSON.stringify(err))
                // throw new Error(err)
            }

            // cy.log('connected to mongo for saving results...')

            // var dbo = db.db('scrape_db')

            // const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

            // dbo.collection('google-themes').insertOne({
            //     date_scraped: currentTime,
            //     data: data
            // }, (err, res) => {
            //     if (err) throw err
            //     db.close()
                
            //     cy.log('err: ', err)
            //     cy.log('Saved: ', res.result)
            // })

        })

    })

})

