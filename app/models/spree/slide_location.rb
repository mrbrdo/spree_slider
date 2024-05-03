class Spree::SlideLocation < ActiveRecord::Base
  has_and_belongs_to_many :slides,
                          class_name: 'Spree::Slide',
                          join_table: 'spree_slide_slide_locations'
                          
  accepts_nested_attributes_for :slides

  validates :name, presence: true
end
