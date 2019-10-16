class Api::V1::CategoriesController < ApplicationController
  def index
    render json: Category.all
  end

  def recommendation
    concat_categories = []
    concat_price = []
    concat_city = []
    user = User.find_by(current_user)
#   to get current user is params?
    user.restaurants.each do |category|
      concat_price.push(category.price)
      concat_city.push(category.city)
      category.yelpcategory.each do |yelpCat|
        concat_categories.push(yelpCat)
      end
    end
# all arrays are filled, now need to pluck out most occurred, hash it, then pass json to setstate
  end
  
end
