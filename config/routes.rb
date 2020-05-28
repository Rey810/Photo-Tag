Rails.application.routes.draw do
  get 'game/new'
  get 'game/update'
  get 'game/show'
  get 'game/create'
  get 'game/update'
  get 'game/show'
  root :to => 'static#index'
  get 'static/show'
end
