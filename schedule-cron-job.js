const cron = require('node-cron')
const exec = require('child_process').exec

cron.schedule('* * * * *', () => {
    console.log('executing!')

    process.exec('npm run start:cron')
})