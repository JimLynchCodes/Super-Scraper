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

## Run locally
```
npm start
```
