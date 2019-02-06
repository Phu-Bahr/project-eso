require "json"
require "http"
require "optparse"

# HTTParty or Faraday


# request = HTTParty.createRequest
# request.auth = "sdgfdggfg"
# request.get()

class RestaurantParser
  attr_reader :data

  def initialize
    @data = []
  end

  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"

  DEFAULT_BUSINESS_ID = "yelp-san-francisco"
  DEFAULT_TERM = "dinner"
  DEFAULT_LOCATION = "San Francisco, CA"
  SEARCH_LIMIT = 10

  def search(choice, location, price)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      choice: choice,
      location: location,
      price: price,
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
        url: restaurant_data["url"],
        image_url: restaurant_data["image_url"]
      }
      @data << new_hash
  end
end
