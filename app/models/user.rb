class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  validates :email, presence: true, email: true

  def username
    return self.email.split('@')[0]
  end

  has_many :choices
  has_many :restaurants, through: :choices
end
