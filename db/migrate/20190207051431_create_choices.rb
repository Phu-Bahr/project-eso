class CreateChoices < ActiveRecord::Migration[5.2]
  def change
    create_table :choices do |t|
      t.belongs_to :restaurant, null: false
      t.belongs_to :user, null: false

      t.timestamps null:false
    end
  end
end
