class Api::V1::RestaurantsController < ApplicationController

  def search
    restaurant_parser = RestaurantParser.new
    term = params[:term]
    location = params[:location]
    restaurant_parser.search(term, location)
    render json: { data: restaurant_parser.data }
  end

end
