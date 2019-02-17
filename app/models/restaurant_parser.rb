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

  def search(categories, location, price)
    url = "#{API_HOST}#{SEARCH_PATH}"
    params = {
      categories: categories.downcase,
      location: location,
      price: price,
      limit: 15,
      radius: 5000
    }

    response = HTTP.auth("Bearer #{ENV["API_KEY"]}").get(url, params: params)
    restaurant_data = response.parse["businesses"].each do |item|

    categories_array = []
    item["categories"].each do |category|
      categories_array << category["title"]
    end

      new_hash = {
        id: item["id"],
        alias: item["alias"],
        coordinates: item["coordinates"],
        name: item["name"],
        categories: categories_array,
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
