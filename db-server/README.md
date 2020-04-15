# DB Server

Unfortunately, MongoDB doesn't like when you try to connect to it directly from the cypress browser process.

Therefore, we need to run this little backend server on the side in order to save the scraped data to the database.

## Usage

please use node v12
```
nvm use
```

## Install Deps
```
npm i
```

## Run Scrape-Job Locally
```
npm start
```

## "Deploying" The Scraper
Use shell commands or `dotcron` to schedule the scraper by running the headless command on the scheduled cron interval
```
npm run scrape:headless
```
