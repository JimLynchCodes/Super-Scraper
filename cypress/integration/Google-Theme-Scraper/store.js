import { Then } from "cypress-cucumber-preprocessor/steps";
const MongoClient = require('mongodb').MongoClient;

Then(`I save it in my database's Google-Theme-Scrapings collection`, (title) => {

    // return new Promise(resolve => {

    MongoClient.connect(process.env.MONGO_URI, (err, db) => {

        if (err)
            throw new Error(err)

        console.log('connected to mongo for saving results...')

        var dbo = db.db(collection)

        const currentTime = moment().format('MMMM Do YYYY, h:mm:ss a')

        dbo.collection('twitter-keyword-scanner-results').insertOne({
            date_scraped: currentTime,
            tweets_by_keyword: tweetsFound
        }, (err, res) => {
            if (err) throw err
            db.close()
            resolve(res.result)
        })

    })

})

// }

