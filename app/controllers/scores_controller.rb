class ScoresController < ApplicationController
  def new
    # this will be hit once the game is over
    # the actual time will come in here
    # @time = params[:time]
    # a score will be initialized
    #@score = Score.new
  end

  def create
    # this will be hit when the user submits their name
    # a Score will be added to the db
  end

  def index
    # all of the scores will be returned that match a certain puzzle
    # so query the db for the params[:puzzle_id]
  end
end
