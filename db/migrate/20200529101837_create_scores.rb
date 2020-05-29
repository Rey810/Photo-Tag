class CreateScores < ActiveRecord::Migration[5.2]
  def change
    create_table :scores do |t|
      t.string :name
      t.integer :score
      t.integer :puzzle_id

      t.timestamps
    end
  end
end
