#!/bin/bash -l

# Print some nice things in the logs.
printf "=======================================\n\n"
printf "Running Super Scraper...\n"
printf "$(date)\n\n"

# Load these for nvm and node.
source ~/.bashrc
source ~/.nvm/nvm.sh
source ~/.profile

# Navigate into the project directory.
cd ~/Git-Projects/Super-Scraper

# Use project's preferred node version from .nvmrc file.
nvm use

# Run the cron job!
npm run scrape:headless


printf "\nTriple Gainer Scraper cronjob has completed!\n"
