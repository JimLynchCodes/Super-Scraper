
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

    // console.log('eg ', req)
    // console.log('eg ', req.body)
    // const scrapedData = req.body['scraped_data']

    const collection = req.body['collection']
    const databaseName = req.body['database_name']

    console.log('Connecting to mongo at: ', mongoUri)

    MongoClient.connect(mongoUri, (err, db) => {

        console.log('Connected to mongo!')

        if (err) {
            console.log('Mongo error: ', err)
        }

        console.log('connected to mongo for saving data to collection: ', collection)

        var dbo = db.db(databaseName)

        const currentDate = moment().format('MMMM Do YYYY')
        const currentTime = moment().format('h:mm:ss a')

        console.log('Saving "empty" data object for today: ', currentDate)

        // const newDocument = {
        //     time_scraped: currentTime,
        //     date_scraped: currentDate,
        //     categories: scrapedData
        // }

        const newDocument = {
            time_scraped: currentTime,
            date_scraped: currentDate,
            categories: {
                all_us_exchanges: {
                    gainers: {
                        'today': [],
                        '5d': [],
                        '1m': [],
                    },
                    losers: {
                        'today': [],
                        '5d': [],
                        '1m': [],
                    },
                },
                large_cap_us: {
                    gainers: {
                        'today': [],
                        '5d': [],
                        '1m': [],
                    },
                    losers: {
                        'today': [],
                        '5d': [],
                        '1m': [],
                    },
                },
                mid_cap_us: {
                    gainers: {
                        'today': [],
                        '5d': [],
                        '1m': [],
                    },
                    losers: {
                        'today': [],
                        '5d': [],
                        '1m': [],
                    },
                }
            }
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

app.post('/update-bc-scrape', async (req, res) => {


    return new Promise((resolve, reject) => {

        const scrapedData = req.body['scraped_data']
        const collection = req.body['collection']
        const databaseName = req.body['database_name']

        const stockCategory = req.body['stock_category']
        const gainerOrLoser = req.body['gainer_or_loser']
        const timeFrame = req.body['time_frame']


        console.log('Connecting to mongo at: ', mongoUri)
        console.log(`Updating scraped data for: ${stockCategory}, ${gainerOrLoser}, ${timeFrame}`)

        MongoClient.connect(mongoUri, (err, db) => {

            console.log('Connected to mongo!')

            if (err) {
                console.log('Mongo error: ', err)
            }

            var dbo = db.db(databaseName)

            const currentDate = moment().format('MMMM Do YYYY')

            console.log(`connected to mongo for updating ${currentDate} bc scrapes in coll: ${collection}`)

            console.log('the scraped data is: ', scrapedData)

            const todaysObjQuery = { date_scraped: currentDate };

            const nestedFieldToUpdate = `categories.${stockCategory}.${gainerOrLoser}.${timeFrame}`

            const newvalues = {
                $set: { [nestedFieldToUpdate]: scrapedData[stockCategory][gainerOrLoser][timeFrame] }
            }

            console.log('res? ', res)

            dbo.collection(collection).updateMany(todaysObjQuery, newvalues, (err, response) => {
                if (err) reject(err)
                console.log(response);
                db.close();

                resolve(res.send({
                    statusCode: 200,
                    body: JSON.stringify(
                        {
                            message: 'Updated succesfully!'
                        },
                        null,
                        2
                    )
                }))

            })

        })

    })

})