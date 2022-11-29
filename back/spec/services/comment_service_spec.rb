require 'rails_helper'

describe CommentService do
  context 'Get Comment' do
    it 'Get a existent comment' do
      test_comment = Comment.new(user_id: '123', content: 'Lorem Ipsum')
      db = double('Some comments', compact: [])
      allow(db).to receive(:find).and_return(test_comment)
      post = double('A post', title: 'A post', image: 'Nope', price: 1.75, comments: db)


      comm = CommentService.get_comment('123', post)

      expect(post.comments).to have_received(:find).with('123').once
      expect(comm).to eq(test_comment)
    end

    it 'Get a inexistent comment' do
      db = double('Some comments', compact: [])
      allow(db).to receive(:find).and_return(nil)
      post = double('A post', title: 'A post', image: 'Nope', price: 1.75, comments: db)

      comm = -> { CommentService.get_comment('Invalid Id', post) }

      expect { comm.call }.to raise_error(CommentService::InvalidCommentException)
      expect(post.comments).to have_received(:find).with('Invalid Id').once
    end
  end
end