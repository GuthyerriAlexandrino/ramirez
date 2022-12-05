require 'rails_helper'

describe LikeService do
    context 'Get Like of a Post' do
      it 'Like when like already exist' do
        test_like = Like.new(user_id: '123')
        db = double('01 like', create!: nil)
        likeable = double("aasdasd", likes: db)

        allow(db).to receive(:find).and_return(test_like)
        likes = double('01 like', create!: nil, destroy: nil)
  
        liked = LikeService.get_like('123', post)
  
        expect(likeable.like).to have_received(:find).with('123').once
        expect(liked).to eq(test_like)
      end
