import { Given } from "cypress-cucumber-preprocessor/steps";

const url = 'https://www.barchart.com/stocks/performance/percent-change/advances?page=all&timeFrame=today'

Given(`I'm logged in`, (categoryObjectKey) => {

  cy.visit('https://www.barchart.com/login')

  // cy.get('input[placeholder="Login with email"]').then ( input => {

  //   cy.log(input)

  //   input.type('foooo')

  // })

  cy.get('input[placeholder="Login with email"]').type(Cypress.env('barchart_user'))

  cy.get('input[placeholder="Password"]').type(Cypress.env('barchart_pw'))

  cy.get('button:contains(Log In)').click()

})

Given(`I navigate to the {string} page`, (categoryObjectKey) => {


  const categoryToUrlMap = {
    
    "large-cap_gainers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&&timeFrame=today&viewName=main',
    "large-cap_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&&timeFrame=today&viewName=technical',
    "large-cap_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&viewName=main&timeFrame=5d',
    "large-cap_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&timeFrame=5d&viewName=technical',
    "large-cap_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&viewName=main&timeFrame=1m',
    "large-cap_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all&viewName=technical&timeFrame=1m',

    "large-cap_losers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&&timeFrame=today&viewName=main',
    "large-cap_losers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&&timeFrame=today&viewName=technical',
    "large-cap_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&viewName=main&timeFrame=5d',
    "large-cap_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&timeFrame=5d&viewName=technical',
    "large-cap_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&viewName=main&timeFrame=1m',
    "large-cap_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=large_cap&page=all&viewName=technical&timeFrame=1m',


    "all-us-exchanges_gainers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&&timeFrame=today&viewName=main',
    "all-us-exchanges_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&&timeFrame=today&viewName=technical',
    "all-us-exchanges_gainers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&viewName=main&timeFrame=5d',
    "all-us-exchanges_gainers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&timeFrame=5d&viewName=technical',
    "all-us-exchanges_gainers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&viewName=main&timeFrame=1m',
    "all-us-exchanges_gainers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&viewName=technical&timeFrame=1m',

    "all-us-exchanges_losers_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&&timeFrame=today&viewName=main',
    "all-us-exchanges_losers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&&timeFrame=today&viewName=technical',
    "all-us-exchanges_losers_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&viewName=main&timeFrame=5d',
    "all-us-exchanges_losers_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&timeFrame=5d&viewName=technical',
    "all-us-exchanges_losers_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&viewName=main&timeFrame=1m',
    "all-us-exchanges_losers_1m_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/declines?screener=us&page=all&viewName=technical&timeFrame=1m',






    
    
    "all-us-exchanges_gainers_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?page=all&&timeFrame=today&viewName=technical',
    
    
    "advances_all-us-exchanges_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?page=all&timeFrame=today',
    "advances_all-us-exchanges_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?page=all&&timeFrame=today&viewName=technical',
    "advances_all-us-exchanges_5d_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&viewName=main&timeFrame=5d',
    "advances_all-us-exchanges_5d_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&timeFrame=5d&viewName=technical',
    "advances_all-us-exchanges_1m_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=us&page=all&viewName=main&timeFrame=1m',


    "advances_large-cap_today_main-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?page=all&timeFrame=today&screener=large_cap',
    "advances_large-cap_today_technical-view": 'https://www.barchart.com/stocks/performance/percent-change/advances?page=all&&timeFrame=today&viewName=technical&screener=large_cap',


    "large_cap_us": 'https://www.barchart.com/stocks/performance/percent-change/advances?screener=large_cap&page=all',

    "google": 'https://www.google.com'
  }

  /**
   *  Place code for navigating to the webpage containing the data to be scraped.
   */

  cy.visit(categoryToUrlMap[categoryObjectKey])

})
