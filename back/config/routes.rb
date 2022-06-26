Rails.application.routes.draw do
  resources :views
  # resources :answers
  # resources :comments
  resources :posts
  resources :specializations
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  # root "users#index"
  post '/login', to: 'registration#login'
  post '/register', to: 'registration#register'
  get '/setimg', to: 'users#set_img'
  post '/matarocris', to: 'posts#create'
end
