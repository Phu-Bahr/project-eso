class Api::V1::RestaurantsController < ApplicationController

  protect_from_forgery unless: -> { request.format.json? }

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

  def create
    restaurant = Restaurant.new(restaurant_params)

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

  private

  def restaurant_params
     {
       alias: params[:alias],
       price: params[:price],
       rating: params[:rating],
       name: params[:name],
       street: params[:location][:address1],
       city: params[:location][:city],
       state: params[:location][:state],
       zip: params[:location][:zip_code],
       image_url: params[:image_url],
       url: params[:url],
       yelpcategory: params[:categories],
       latitude: params[:coordinates][:latitude],
       longitude: params[:coordinates][:longitude]
     }
  end

end
