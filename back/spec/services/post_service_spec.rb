require 'rails_helper'

describe PostService do
    context 'User making a post' do
      it 'Valide user posting' do
        test_post = Post.new(user_id: '123')
        db = double(title: 'Foto de gatinho', price'20.50', uri: 'img' create!: nil)

        allow(db).to receive(:find).and_return(test_post)
        post = double(title: 'Foto de gatinho', price'20.50', uri: 'img' create!: nil)
  
        posted = PostService.get_post('123', post)
  
        expect(posted).to eq(test_post)
      end
