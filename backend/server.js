
const MongoClient = require('mongodb').MongoClient
const moment = require('moment')
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(bodyParser.raw())

const PORT = 3000
const mongoUri = process.env['MONGO_URI']


app.listen(PORT, () => console.log('Super Scraper backend is listening on port 3000!'))


app.get('/health-check', (req, res) => {
    res.send({
        statusCode: 200,
        body: JSON.stringify(
            {
                message: 'Super Scraper backend is ready to accept scraped data & insert it into the database!'
            },
            null,
            2
        )
    })
})


app.post('/shutdown-backend', (req, res) => {
    res.send('Shutting down backend server...')
    process.exit()
})


app.post('/save', async (req, res) => {

    console.log('eg ', req)
    console.log('eg ', req.body)
    const scrapedData = req.body['scraped_data']
    const collection = req.body['collection']

    console.log('Connecting to mongo at: ', mongoUri)
    console.log('Saving scraped data: ', scrapedData)

    MongoClient.connect(mongoUri, (err, db) => {

        console.log('Connected to mongo!')

        if (err) {
            console.log('Mongo error: ', err)
        }

        console.log('connected to mongo for saving results to collection: ', collection)

        var dbo = db.db('scrape_db')

        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

        const newDocument = {
            date_scraped: currentTime,
            data: scrapedData
        }

        dbo.collection(collection).insertOne(newDocument, (err, data) => {
            if (err) throw err
            else console.log('Saved succesfully!\n', JSON.stringify(newDocument, null, 2))
            db.close()

            res.send({
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: 'Saved succesfully!',
                        document_saved: newDocument
                    },
                    null,
                    2
                )
            })

        })

    })

})
