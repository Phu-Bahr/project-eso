class AddYelpCategory < ActiveRecord::Migration[5.2]
  def change
    add_column :restaurants, :yelpcategory, :string, array: true
  end
end
