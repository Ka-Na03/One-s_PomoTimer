Rails.application.routes.draw do
  get "/login", to: "sessions#new"
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/signup", to: "users#new"
  post "/users", to: "users#create"

  get "/mypage", to: "users#show"

  root 'timer#index'


end
