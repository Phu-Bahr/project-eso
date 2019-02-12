class AddReviewCount < ActiveRecord::Migration[5.2]
  def change
        add_column :restaurants, :review_count, :integer
  end
end
