#!/bin/bash -l

# Print some nice things in the logs.
printf "=======================================\n\n"
printf "Running Super Scraper...\n"
printf "$(date)\n\n"

# Run the cron job!
npm run scrape:headless

printf "\nTriple Gainer Scraper cronjob has completed!\n"
