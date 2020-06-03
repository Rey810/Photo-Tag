class AddFoundToCharacters < ActiveRecord::Migration[5.2]
  def change
    add_column :characters, :found, :boolean
  end
end
