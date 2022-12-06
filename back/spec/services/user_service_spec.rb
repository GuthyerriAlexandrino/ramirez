require 'rails_helper'

describe UserService do
  context 'User photographer' do
    it 'User with photographer permissions' do
      user = UserService.matching_params({[name: 'Alice', email: 'alicinhareporte@gmail.com', photographer: 'true', password: '123456', password_confirmation:'123456',
      city: 'Mombaça', state: 'CE', bio:'aaaa', profile_img:'aaa', specialization:'Foto infantil' => [], services_price:'1.10' => []]})

      expect(User).to eq({[name: 'Alice', email: 'alicinhareporte@gmail.com', photographer: 'true', password: '123456', password_confirmation:'123456',
      city: 'Mombaça', state: 'CE', bio:'aaaa', profile_img:'aaa', specialization:'Foto infantil' => [], services_price:'1.10' => []]})
    end
  end

  context 'Comum User ' do
    it 'User searching for photographers' do
      user = UserService.matching_params({[name: 'Ana', email: 'ANAlinda@gmail.com', profile_img: 'img', specialization: 'Foto infantil', 
      services_price: '1.10', city:'Mombaça', state: 'Ce', views: '10', bio: 'aaaa']}).

      expect(User).to eq({[name: 'Ana', email: 'ANAlinda@gmail.com', profile_img: 'img', specialization: 'Foto infantil', 
      services_price: '1.10', city:'Mombaça', state: 'Ce', views: '10', bio: 'aaaa']})
    end
  end
