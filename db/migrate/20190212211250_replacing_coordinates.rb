class ReplacingCoordinates < ActiveRecord::Migration[5.2]
  def change
    remove_column :restaurants, :coordinates, :string
  end
end
