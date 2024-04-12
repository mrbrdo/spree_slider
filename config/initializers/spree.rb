# Configure Spree Preferences
#
# Note: Initializing preferences available within the Admin will overwrite any changes that were made through the user interface when you restart.
#       If you would like users to be able to update a setting with the Admin it should NOT be set here.
#
# Note: If a preference is set here it will be stored within the cache & database upon initialization.
#       Just removing an entry from this initializer will not make the preference value go away.
#       Instead you must either set a new value or remove entry, clear cache, and remove database entry.
#
# In order to initialize a setting do:
# config.setting_name = 'new value'
Rails.application.config.after_initialize do
  # Add a new 'subscriptions' section to the Spree admin main menu
  Rails.application.config.spree_backend.main_menu.add(
    Spree::Admin::MainMenu::SectionBuilder.new("slides", 'file-slides-fill.svg')
      # Only display this section if the user has the necessary admin abilities
      .with_admin_ability_check(Spree::Slide)
      # Add items to the section
      .with_items([
        Spree::Admin::MainMenu::ItemBuilder.new('spree_slider.config_name', Spree::Core::Engine.routes.url_helpers.admin_slides_path).with_match_path('/slides').build,
        Spree::Admin::MainMenu::ItemBuilder.new('spree_slider_locations.config_name', Spree::Core::Engine.routes.url_helpers.admin_slide_locations_path).with_match_path('/slide_locations').build
])
      .build
  )
end

Spree.user_class = 'Spree::User'
