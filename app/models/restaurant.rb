class Restaurant < ApplicationRecord
  has_many :categorizations
  has_many :categories, through: :categorizations

  has_many :choices
  has_many :users, through: :choices
end
