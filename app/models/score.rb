class Score < ApplicationRecord
  belongs_to :puzzle
  default_scope -> { order(score: :asc)}
end
