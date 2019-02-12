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

  # def create
  #   alias = params[:alias]
  #   coordinates = params[:coordinates]
  #   price = params[:price]
  #   rating = params[:rating]
  #   name = params[:name]
  #   street = params[:street]
  #   city = params[:city]
  #   state = params[:state]
  #   zip = params[:zip]
  #   description = params[:description]
  #   image_url = params[:image_url]
  #   url = params[:url]
  #
  #   restaurant = Restaurant.new(
  #     name: name,
  #     coordinates: coordinates,
  #     price: price,
  #     rating: rating,
  #     name: name,
  #     street: street,
  #     city: city,
  #     state: state,
  #     zip: zip,
  #     description: description,
  #     image_url: image_url,
  #     url: url
  #   )
  #
  #   if restaurant.save
  #
  #     choice = Choice.new(user: current_user, restaurant: restaurant)
  #     # binding.pry
  #     if choice.save
  #       # binding.pry
  #       render json: {restaurant: restaurant}
  #     else
  #       render json: {error: choice.errors.full_messages}, status: :unprocessable_entity
  #     end
  #   else
  #     render json: {error: restaurant.errors.full_messages}, status: :unprocessable_entity
  #   end
  # end



end
