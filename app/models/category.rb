class Category < ApplicationRecord
  validates :name, presence: true

  has_many :categorizations
  has_many :restaurants, through: :categorizations
end
