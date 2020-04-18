
# Super Scraper! Addictive

<img src="screenshots/scraper-demo.gif">

<br/>

## Usage Guide

### (Running The Google Theme Scraper)

#### Please use node v12.16.1
```
nvm use
```

#### Install dependencies
```
npm i
```

<br/>

### _Running The Google_

### Start A Local Mongo Instance

There are many ways to start a mongo server,  but here is one way:
```
brew services mongo-community start
```

check if it's running by listing the running brew services:
```
brew services list
```



# Running The Scraper
- concurrently starts up the scraper's "back-end" and "front-end".
- back-end is a local express node server that interacts with the database and takes REST calls from front-end.
- front-end is a cypress-controlled browser process that interacts with web pages.
- This is great for defveloping becauase cypress has hot reloading built in, and you can really get into the weeds use `cy.log` to see what's going on.
```
npm start
```


#### Running In Headless Mode

  - concurrently spins up "backend-end" and "frontend" where the browser is a headless browser process.
  - How you would run the scraper "in production" on a remote server.
```
npm run scrape:headless
```


#### Start _Only_ Backend Server
```
npm run start:backend
```

You can test it locally via `curl` or Postman by hitting the back-end endpoints with REST calls. 

<br/>


# Backend Endpoints

### Health-Check

-  `health-check` - GET 

   A convenient sanity check to see if the server is running. "Super Scraper backend is ready to accept scraped data & insert it into the database!" with a 200 status code.

   http://localhost:3000/health-check

   Response: **200** - "Shutting down backend server..."


<br/>

### Save

- `save` - POST

  Saves the scraped data along with the current time as a new mongo document in the specified collection.

  http://localhost:3000/save

  body: 
  ```
  {
	  "scraped_data": String | Object | Array,
	  "collection": String
  }
  ```

  Response: **200** 

  responseBody:
  ```
  {
    "statusCode": 200,
    "body": "{ 
      "message": "Saved succesfully!",
      "document_saved\": _id
      "date_scraped\": Date
      "data": String | Object | Array 
  }
  ```


### Shutdown-Backend

  - `shutdown-backend` - POST

    Shuts down the backend server and returns the string, "Shutting down backend server..."

    http://localhost:3000/shutdown-backend

    body: 
    ```
    {}
    ```

    Response: **200** - "Shutting down backend server..."


### Deploying The Scraper
To deploy this scraper, clone the project on any linux, mac, or windows machine and setup a cron job that runs the `scrape:headless` command.

<br/>

## TODO

- [ &nbsp; ] - Get Example Google Theme Scraper working

- [ &nbsp; ] - Implement data validation step

- [ &nbsp; ] - Add optional text / email notifications on success and/or failures

- [ &nbsp; ] - Setting Up the Cron Scheduling

<br/>

# Developing Your Own Scraper

## Add A Feature File For The New Scraper

- put the file in `cypress/integration/scrape-scripts`.
- use the Google-Theme-Scraper example as a guide, changing the "Given" and "When" conditions to grab th desired scrape data.


## Implement the Feature File Steps 

Create a new folder with the same name as the `.feature` file created for the new scraper.

Within it, put the three files `navigate`, `scrape`, and `store`, which correspond to the `Given`, `When`, `Then` statements in the feature file, respectievly.


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






