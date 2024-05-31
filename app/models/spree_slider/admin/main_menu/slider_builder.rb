module SpreeSlider
  module Admin
    module MainMenu
      class SliderBuilder
        include ::Spree::Core::Engine.routes.url_helpers

        def build
          items = [ 
                    Spree::Admin::MainMenu::ItemBuilder.new('spree_slider.config_name', admin_slides_path).
                      with_availability_check(->(ability, _store) { ability.can?(:manage, ::Spree::Slide) && ability.can?(:index, ::Spree::Slide) }).
                      with_match_path('/slides').
                      build,
                    Spree::Admin::MainMenu::ItemBuilder.new('spree_slider_locations.config_name', admin_slide_locations_path).
                      with_availability_check(->(ability, _store) { ability.can?(:manage, ::Spree::SlideLocation) }).
                      with_match_path('/slide_locations').
                      build
                  ]

          Spree::Admin::MainMenu::SectionBuilder.new('slides', 'file-slides-fill.svg').
            with_items(items).
            build
        end
      end
    end
  end
end