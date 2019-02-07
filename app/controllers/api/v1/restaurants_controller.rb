class Api::V1::RestaurantsController < ApplicationController

  def search
    restaurant_parser = RestaurantParser.new
    categories = params[:categories]
    location = params[:location]
    price = params[:price]
    # categories = "italian"
    # location = "boston, ma"
    # price = 2
    restaurant_parser.search(categories, location, price)

    # session[:yelp_data] = restaurant_parser.data

    render json: { data: restaurant_parser.data }
  end

  # def index
  #   yelp_data = session[:yelp_data]
  #   session[:yelp_data] = nil
  #
  #   # maybe clean up the yelp_data to only have the most necessary info
  #   # then pass it back to react
  #
  #   render json: {data: yelp_data}
  # end

end
