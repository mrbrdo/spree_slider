module Spree
  module Admin
    class SlideLocationsController < ResourceController
      respond_to :html
      before_action :setup_new_slides_value, only: :edit

      def update_slide_positions
        ApplicationRecord.transaction do
          params[:positions].each do |id, index|
            Spree::Slide.where(id: id).update_all(position: index)
          end
        end
      end

      def index
        @slide_locations = Spree::SlideLocation.order(:name)
      end

      private

      def setup_new_slides_value
        @slide_location.slides.build if @slide_location.slides.empty?
      end

    end
  end
end
