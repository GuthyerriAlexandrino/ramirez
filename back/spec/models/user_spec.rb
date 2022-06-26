require 'rails_helper'

describe User, type: :model do
  it { is_expected.to be_mongoid_document }
  it { is_expected.to have_timestamps }
  it { is_expected.to have_fields(:email, :name, :password) }
  # it { is_expected.to validate_uniqueness_of(:email) }
  it { is_expected.to have_index_for(email: 1).with_options(unique: true) }
  #it { is_expected.to accept_nested_attributes_for(:posts) }.case_insensitive.with_message("is already taken") }
end