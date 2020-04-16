
const MongoClient = require('mongodb').MongoClient;
const moment = require('moment')
require('dotenv').config()

const mongoUri = process.env['MONGO_URI']

module.exports.healthCheck = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Super Scraper backend is ready to accept scraped data & insert it into the database!'
      },
      null,
      2
    ),
  }
}


module.exports.save = async event => {

  console.log('type of: ', typeof event.body)
  console.log('s1:', JSON.parse(event.body))
  console.log('s:', JSON.parse(event.body)['scraped_data'])

  let scrapedData = ''

  if ((typeof event.body) === 'string') {

    console.log('Parsing string body into JSON and getting scraped data:\n')
    scrapedData = JSON.parse(event.body)['scraped_data']
    console.log(scrapedData)

  } else {
    scrapedData = event.body['scraped_data']
  }

  console.log('Connecting to mongo at: ', mongoUri)

  return new Promise((resolve, reject) => {


    MongoClient.connect(mongoUri, (err, db) => {

      console.log('Connected to mongo!')

      if (err) {

        console.log('Mongo error: ', err)

      }

      // cy.log('connected to mongo for saving results...')

      var dbo = db.db('scrape_db')

      const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

      const newDocument = {
        date_scraped: currentTime,
        data: scrapedData
      }

      dbo.collection('google-themes').insertOne(newDocument, (err, res) => {
        if (err) throw err
        else console.log('Saved succesfully!\n', JSON.stringify(newDocument, null, 2))
        db.close()



        resolve(
          {
            statusCode: 200,
            body: JSON.stringify(
              {
                message: 'Saved succesfully!',
                document_saved: newDocument
              },
              null,
              2
            ),
          }
        )
      })

    })

  })

}