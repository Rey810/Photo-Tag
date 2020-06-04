class ScoresController < ApplicationController
  
  def create
    # this will be hit when the user submits their name in the views/puzzles/show
    @puzzle_id = params[:puzzle_id]
    @puzzle = Puzzle.find(params[:puzzle_id])
    @score = @puzzle.scores.build(name: params[:name], score: params[:end_time])

    if @score.save
      flash[:success] = "Score saved"
    else 
      flash[:danger] = "Score not saved." 
    end

    redirect_to scores_path(:puzzle_id => @puzzle_id)
  end

  def index
    @puzzle_id = params[:puzzle_id]
    @puzzle = Puzzle.find(params[:puzzle_id])
    @scores = Score.where(puzzle_id: @puzzle_id)
  end
end
