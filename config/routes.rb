Rails.application.routes.draw do
  resources :scores, only: [:new, :create, :index]
  resources :puzzles, only: [:show]
  root :to => 'static#home'
end
