class CreateRestaurants < ActiveRecord::Migration[5.2]
  def change
    create_table :restaurants do |t|
      t.string :alias
      t.string :coordinates
      t.string :price
      t.integer :rating
      t.string :name, null: false
      t.string :street, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.text :description
      t.text :image_url
      t.string :url

      t.timestamps null: false
    end
  end
end
