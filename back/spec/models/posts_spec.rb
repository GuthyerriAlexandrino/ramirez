require 'rails_helper'


 describe Post, type: :model do
    it { is_expected.to be_mongoid_document }
    it { is_expected.to have_timestamps }
    it { is_expected.to have_fields(:title, :image, :price) }
    it { is_expected.to validate_length_of(:title).with_maximum(160).with_minimum(6) }
    it { is_expected.to be_embedded_in(:user).of_type(User) }
    
 end