class Api::V1::RestaurantsController < ApplicationController
  # Ideally this is a API controller, not a regular controller!


# a simply version of how you would hit this endpoint
# http://localhost:3000/meetups?topic_query=foo

  def search
    restaurant_parser = RestaurantParser.new
    term = params[:term]
    location = params[:location]
    restaurant_parser.search(term, location)
    render json: { data: restaurant_parser.data }
  end

end
