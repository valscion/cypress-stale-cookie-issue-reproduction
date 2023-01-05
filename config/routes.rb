Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "examples#instructions"

  get '/page_a' => 'examples#page_a'
  get '/redirect_back_to_a' => 'examples#redirect_back_to_a'
  get '/page_b' => 'examples#page_b'
  post '/set_the_flash' => 'examples#set_the_flash'
end
