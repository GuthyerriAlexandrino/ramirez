require 'rails_helper'

describe SpecializationService do
  context 'Get Specialization' do
    it 'Get a existent specialization' do
      test_specialization = Specialization.new(name: 'Fotografia maritima')
      db = double('Fotografia maritima')
      allow(db).to receive(:all).and_return(test_specialization)
      post = double(name: db)


      speciali = SpecializationService.get_specialization('Fotografia maritima')

      expect(speciali).to eq(test_specialization)
    end
