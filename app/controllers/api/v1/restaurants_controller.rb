class Api::V1::RestaurantsController < ApplicationController

  protect_from_forgery unless: -> { request.format.json? }

  def create
    # binding.pry
    name = params["name"]
    restaurant.name
    restaurant = Restaurant.new(name: name, )

    if restaurant.save

      choice = Choice.new(user: current_user, restaurant: restaurant)
      # binding.pry
      if choice.save
        # binding.pry
        render json: {restaurant: restaurant}
      else
        render json: {error: choice.errors.full_messages}, status: :unprocessable_entity
      end
    else
      render json: {error: restaurant.errors.full_messages}, status: :unprocessable_entity
    end
  end


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

end
