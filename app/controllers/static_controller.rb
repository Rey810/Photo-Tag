class StaticController < ApplicationController
  def home
    @puzzles = Puzzle.all
  end
end
