require "json"
require "http"
require "optparse"

class RestaurantParser
  attr_reader :data

  def initialize
    @data = []
  end

  API_HOST = "https://api.yelp.com"
  SEARCH_PATH = "/v3/businesses/search"
  BUSINESS_PATH = "/v3/businesses/"

  DEFAULT_BUSINESS_ID = "yelp-san-francisco"
  DEFAULT_TERM = "italian"
  DEFAULT_LOCATION = "Boston, MA"
  DEFAULT_PRICE = 2
  SEARCH_LIMIT = 20


  def search(categories, location, price)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      categories: categories.downcase,
      location: location,
      price: price,
      limit: 20,
      radius: 5000
      # categories: DEFAULT_TERM,
      # location: DEFAULT_LOCATION,
      # price: DEFAULT_PRICE,
      # limit: SEARCH_LIMIT
    }

    response = HTTP.auth("Bearer #{ENV["API_KEY"]}").get(url, params: params)
    restaurant_data = response.parse["businesses"].each do |item|

      new_hash = {
        id: item["id"],
        alias: item["alias"],
        coordinates: item["coordinates"],
        name: item["name"],
        categories: item["categories"],
        price: item["price"],
        location: item["location"],
        rating: item["rating"],
        url: item["url"],
        image_url: item["image_url"],
        review_count: item["review_count"]
      }
      @data << new_hash
    end
  end
end
