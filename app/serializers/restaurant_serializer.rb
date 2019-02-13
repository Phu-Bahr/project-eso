class RestaurantSerializer < ActiveModel::Serializer
  attributes :UserRestaurants, :UserName


  def UserRestaurants
    current_user.restaurants
  end

  def UserName
    current_user.email

  end
end
