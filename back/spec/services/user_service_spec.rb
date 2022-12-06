require 'rails_helper'

describe UserService do
  context 'User informations' do
    it 'User requesting his informations' do
      user = UserService.all_permited

      expect(user).to eq([:name, :email, :photographer, :password, :password_confirmation,
        :city, :state,
        :bio, :profile_img, :specialization => [], :services_price => []])
    end

    it 'User requesting other informations' do
      user = UserService.search_view

      expect(user).to eq([:name, :email, :profile_img, :specialization, :services_price, :city, :state, :views, :bio])
    end
  end
end
