class GameController < ApplicationController
  def new
  end

  def create
  end

  def update
  end

  def show
    # maybe start the timer here 
    # a redirect from new (where the timer could start to here doesn't make sense, does it?)
    @imageID = params[:img_id] 
  end

  def index

  end
end
