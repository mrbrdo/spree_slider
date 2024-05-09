Spree::Core::Engine.routes.draw do
  namespace :admin do
    resources :slides do
      collection do
        post :update_positions
      end
    end

    resources :slide_locations  do
      collection do
        post :update_slide_positions
      end
    end
  end

  namespace :api, defaults: { format: 'json' } do
    namespace :v2 do
      namespace :storefront do
        resources :slide_locations, only: [:show]
      end
    end
  end
end
