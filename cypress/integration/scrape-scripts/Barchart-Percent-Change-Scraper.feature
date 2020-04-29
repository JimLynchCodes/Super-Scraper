Feature: The Google Theme Scraper

  I want to scrape the theme of google's home page image each day

  @focus
  Scenario: Scraping Barchart Gainers Info

    Given a bc scrape object for today with empty arrays in the database

    Given I'm logged in

    # -- Large Cap Gainers --

    # Large Cap - Gainers - Today
    When I navigate to the "large-cap_gainers_today_main-view" page
    And I scrape the "large_cap_us" "gainers" for "today" on the "main-view", new data: "true"
    
    When I navigate to the "large-cap_gainers_today_technical-view" page
    And I scrape the "large_cap_us" "gainers" for "today" on the "technical-view", new data: "false"

    Then I update the database's bc scrape object for "large_cap_us" "gainers" "today"

    # Large Cap - Gainers - 5d
    When I navigate to the "large-cap_gainers_5d_main-view" page
    And I scrape the "large_cap_us" "gainers" for "5d" on the "main-view", new data: "true"

    When I navigate to the "large-cap_gainers_5d_technical-view" page
    And I scrape the "large_cap_us" "gainers" for "5d" on the "technical-view", new data: "false"

    Then I update the database's bc scrape object for "large_cap_us" "gainers" "5d"
    
    # Large Cap - Gainers - 1m
    When I navigate to the "large-cap_gainers_1m_main-view" page
    And I scrape the "large_cap_us" "gainers" for "1m" on the "main-view", new data: "true"

    When I navigate to the "large-cap_gainers_1m_technical-view" page
    And I scrape the "large_cap_us" "gainers" for "1m" on the "technical-view", new data: "false"

    Then I update the database's bc scrape object for "large_cap_us" "gainers" "1m"
    
    # -- Large Cap Losers --

    # Large Cap - Losers - Today
    When I navigate to the "large-cap_losers_today_main-view" page
    And I scrape the "large_cap_us" "losers" for "today" on the "main-view", new data: "true"

    When I navigate to the "large-cap_losers_today_technical-view" page
    And I scrape the "large_cap_us" "losers" for "today" on the "technical-view", new data: "false"

    Then I update the database's bc scrape object for "large_cap_us" "losers" "today"

    # Large Cap - Losers - 5d
    When I navigate to the "large-cap_losers_5d_main-view" page
    And I scrape the "large_cap_us" "losers" for "5d" on the "main-view", new data: "true"

    When I navigate to the "large-cap_losers_5d_technical-view" page
    And I scrape the "large_cap_us" "losers" for "5d" on the "technical-view", new data: "false"

    Then I update the database's bc scrape object for "large_cap_us" "losers" "5d"
    
    # Large Cap - Losers - 1m
    When I navigate to the "large-cap_losers_1m_main-view" page
    And I scrape the "large_cap_us" "losers" for "1m" on the "main-view", new data: "true"

    When I navigate to the "large-cap_losers_1m_technical-view" page
    And I scrape the "large_cap_us" "losers" for "1m" on the "technical-view", new data: "false"

    Then I update the database's bc scrape object for "large_cap_us" "losers" "1m"
    




    # All US Exchanges - Today

    # When I navigate to the "advances_all-us-exchanges_today_main-view" page
    # And I scrape the "all_us_exchanges" "gainers" for "today" on the "main-view"

    # When I navigate to the "advances_all-us-exchanges_today_technical-view" page
    # And I scrape the "all_us_exchanges" "gainers" for "today" on the "technical-view"

    # Then I update the database's bc scrape object for "all_us_exchanges" "gainers" "today"

    # # All US Exchanges - Gainers - 5day

    # When I navigate to the "advances_all-us-exchanges_5d_main-view" page
    # And I scrape the "all_us_exchanges" "gainers" for "5d" on the "main-view"

    # When I navigate to the "advances_all-us-exchanges_5d_technical-view" page
    # And I scrape the "all_us_exchanges" "gainers" for "5d" on the "technical-view"

    # Then I update the database's bc scrape object for "all_us_exchanges" "gainers" "5d"


    # # All US Exchanges - Gainers - 1m

    # When I navigate to the "advances_all-us-exchanges_1m_main-view" page
    # And I scrape the "all_us_exchanges" "gainers" for "1m" on the "main-view"

    # When I navigate to the "advances_all-us-exchanges_1m_technical-view" page
    # And I scrape the "all_us_exchanges" "gainers" for "1m" on the "technical-view"

    # Then I update the database's bc scrape object for "all_us_exchanges" "gainers" "1m"





# When I navigate to the "advances_all-us-exchanges_5d_main-view" page
# And I scrape the "gainers" of "all_us_exchanges" for "today" on the "main-view"

# When I navigate to the "advances_all-us-exchanges_5d_technical-view" page
# And I scrape the "gainers" of "all_us_exchanges" for "5d" on the "technical-view"

# Then I update the database's bc scrape object for "all_us_exchanges" "gainers" "5d"






# And I navigate to the "google" page
# And I navigate to the "advances_all-us-exchanges_5d_main-view" page
# And I scrape the "gainers" of "all-us-exchanges" for "5d" on the "main-view"

# And I navigate to the "advances_all-us-exchanges_5d_technical-view" page
# And I scrape the "gainers" of "all-us-exchanges" for "5d" on the "technical-view"

# And I navigate to the "advances_all-us-exchanges_1m_main-view" page
# And I scrape the "gainers" of "all-us-exchanges" for "1m" on the "main-view"

# And I navigate to the "advances_all-us-exchanges_1m_technical-view" page
# And I scrape the "gainers" of "all-us-exchanges" for "1m" on the "technical-view"

#

# Given I navigate to the "advances_large-cap_today_main-view" page
# When I scrape the "gainers" of "large-cap" for "today" on the "main-view"

# And I navigate to the "advances_large-cap_today_technical-view" page
# And I scrape the "gainers" of "large-cap_us" for "today" on the "technical-view"

# And I navigate to the "large_cap_us" page

# And The data is in the proper format

# Then I update the database's bc scrape object for "large-cap_us" "gainers" "today"
