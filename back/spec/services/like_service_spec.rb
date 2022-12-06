require 'rails_helper'

describe LikeService do
  context 'Get Like of a Post' do
    it 'Like when like already exist' do
      test_like = Like.new(user_id: '123')
      db = double('01 like', create!: nil)
      likeable = double(Post, likes: db, instance_of?: Post.class)

      allow(db).to receive(:find).and_return(test_like)

      liked = LikeService.get_like('123', likeable)

      expect(likeable.likes).to have_received(:find).with('123').once
      expect(liked).to eq(test_like)
    end
  end
end