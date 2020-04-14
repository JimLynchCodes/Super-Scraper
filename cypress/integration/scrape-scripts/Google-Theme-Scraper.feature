Feature: The Google Theme Scraper
 
  I want to scrape the theme of google's home page image each day
  
  @focus
  Scenario: Scraping the google Theme
    Given I open Google search home page
    When I scrape the day's theme of the day's google image
    # And The data is in the proper format
    Then I save it in my database's Google-Theme-Scrapings collection
