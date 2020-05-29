Rails.application.routes.draw do
  get 'scores/new'
  get 'scores/create'
  get 'scores/index'
  resources :puzzles, only: [:show]
  root :to => 'static#home'
end
