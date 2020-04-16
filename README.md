# Super-Scraper
An awesome setup for scraping data from websites and storing it in a database. 

🤖 🦾 ➡️ 📖 ➡ 📦

^(emoji translation)

_"Using Robot Strength To Get Data aAnd Put It In A Little Box For Later"_

<br/>

## Usage Guide

please use node v12.16.1
```
nvm use
```

install dependencies
```
npm i
```

Run your scrapes as "Features" via cypress:
```
npm start
```

This concurrently starts up a local backend database-node server that interacts with the database and the cypress browser automation tool which navigates to data to scrape.

To run just the backend server:
```
npm run scrape:headless
```

To "Deploy" this scraper you would put this script on any linux, mac, or windows machine you could  `scrape:headless`

<br/>

## TODO

- [ &nbsp; ] - Get Example Google Theme Scraper working

- [ &nbsp; ] - Implement data validation step

- [ &nbsp; ] - Add optional text / email notifications on success and/or failures

<br/>

## Contributing
Please contribute! 🙏

<br/>

# How To Re-Create This Project From Scratch

## 1. Create A Directory Attached to a Git Repo
I just go on github, create the repo in the browser, and clone it to my computer.

## 2. Choose A NodeJs Version
Decide on a good (prefereably LTS) version of Node (the latest version of v12 is a good choice at the time of this writing). 

It is recommended to have [nvm](https://github.com/nvm-sh/nvm) installed and create a .nvmrc file:
```
nvm i v12
nvm use v12
node -v > .nvmrc
```

## 3. Install the Latest Version of Cypress

Install `cypress` as a dev dependency:
```
npm i -D cypress
```

## 4. Run Cypress 
When you run cypress in a project with no cypress folder, it creates one with a bunch of boilerplate cypress stuff.

Add a script in your package.json for cypres's `open` and `run` commands (we recommend having `npm start` be an alias for a "scrape" command):

Here is a sample snippet of the "scripts" sections in package.json:
```
"scripts": {
    "start": "npm run scrape",
    "scrape": "cypress open",
    "scrape:headless": "cypress run"
  },
```

## 5. Install CucumberJS
cucumber is an awesome plugin that we are using in a slightly usual way since this is a slightly usual project (using what is normally and e2e testing framework as _the application itself_).

 ### 5.a install the cucumber library:
```
npm i -D cypress-cucumber-preprocessor
```

 ### 5.b Add this library it to your "plugins":

cypress/plugins/index.js
```
const cucumber = require('cypress-cucumber-preprocessor').default
 
module.exports = (on, config) => {
  on('file:preprocessor', cucumber())
}
```

###  5.c Make Cypress Look For .feature Files 

cypress.json
```
{
  "testFiles": "**/*.feature"
}
```

### 5.d Create A Sample Feature

create a feature file anywhere within the `cypress/integration` folder that follows proper [Gherkin]() syntax.

Here's a sample feature file:
```
Feature: The Google Theme Scraper
 
  I want to scrape the theme of google's home page image each day
  
  @focus
  Scenario: Opening a social network page
    Given I open Google search home page
    When I scrape the day's theme of the day's google image
    Then I save it in my database's Google-Theme-Scrapings collection
```

## 5.e Put "Step Defs" Near The feature Files

This isn't totally necessary as you could put the step definition files in the default `use the default path that cypress 

add this to `package.json`:

```
"cypress-cucumber-preprocessor": {
    "step_definitions": "cypress/integration/"
  }
```

then create a folder within this folder which has same name at the .feature file.

## 5.f Create Example Script "Step Definition" Files

For the examples feature file, we can create these three step definiton files:

cypress/integration/Google-Theme-Scraper/navigate.js
```
import { Given } from "cypress-cucumber-preprocessor/steps";
 
const url = 'https://google.com'
Given(`I open Google search home page`, (title) => {
  cy.visit(url)
})
```

cypress/integration/Google-Theme-Scraper/scrape.js
```

```


## 5.g Add Data Storage Of Your Choice

Put your favorite save / insert code in the your "Then" step defintion file" 

cypress/integration/Google-Theme-Scraper/store.js
```
const MongoClient = require('mongodb').MongoClient;

const save = (data, collection) => {

    return new Promise(resolve => {

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

}

```

## 6 Create .env File And Load It During The Scraping

Install `dotenv`
```
npm i dotenv -D
```

Load the `.env` file during your scrape by adding this the `plugins/index.js`:
```
require('dotenv').config()
```

Then read the env variables with `process.env.MONGO_URI`






