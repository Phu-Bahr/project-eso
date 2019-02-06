require "json"
require "http"
require "optparse"

class RestaurantParser
  attr_reader :data

  def initialize
    @data = []
  end



  # Constants, do not change these
  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"  # trailing / because we append the business id to the path

  DEFAULT_BUSINESS_ID = "yelp-san-francisco"
  DEFAULT_TERM = "dinner"
  DEFAULT_LOCATION = "San Francisco, CA"
  SEARCH_LIMIT = 5

  def search(term, location)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      term: DEFAULT_TERM,
      location: DEFAULT_LOCATION,
      limit: SEARCH_LIMIT
    }

    response = HTTP.auth("Bearer #{ENV["API_KEY"]}").get(url, params: params)
    # binding.pry
    restaurant_data = response.parse["businesses"][0]
    # binding.pry

      new_hash = {
        name: restaurant_data["name"],
        categories: restaurant_data["categories"],
        price: restaurant_data["price"],
        location: restaurant_data["location"],
        rating: restaurant_data["rating"],
        url: restaurant_data["url"]
      }
      @data << new_hash
  end
end
