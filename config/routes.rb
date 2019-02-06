Rails.application.routes.draw do
  devise_for :users
    devise_scope :user do
      authenticated :user do
        root :to => 'categories#index', as: :authenticated_root
      end
      unauthenticated :user do
        root :to => 'devise/sessions#new', as: :unauthenticated_root
    end
  end

  resources :categories

  namespace :api do
    namespace :v1 do
      resources :categories, only: [:index]
    end
  end

  namespace :api do
    namespace :v1 do
      # resources :restaurants, only: [:index] do
        get "/restaurants", to: "restaurants#search"
      # end
    end
  end
end
