require 'rails_helper'

describe Comment, type: :model do
    it { is_expected.to be_mongoid_document }
    it { is_expected.to have_timestamps }
    it { is_expected.to have_fields(:user_id, :content) }
    it { is_expected.to validate_length_of(:content).with_maximum(500).with_minimum(1) }
 end