class PuzzlesController < ApplicationController
  def show
    @puzzle = Puzzle.find(params[:id])

    # called in show.js 
    respond_to do |format|
      format.html
      format.json { render :json => { :puzzle_characters => @puzzle.characters, :characterCount => @puzzle.characters.count } }
    end
    # render json: @puzzle.characters, only: [:name, :x_position, :y_position]
  end
end
