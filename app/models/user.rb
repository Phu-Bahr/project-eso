class User < ApplicationRecord

  def index
  end

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true, email: true

  def username
    return self.email.split('@')[0].capitalize
  end

  has_many :choices
  has_many :restaurants, through: :choices
end
