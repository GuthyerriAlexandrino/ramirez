# frozen_string_literal: true

module PostService
  def self.user_posts(user_id)
    user = User.find(_id: user_id)
    user.posts
  end

  def self.post_params(title, price, uri)
    post = { title:, image: uri }
    post[:price] = price.to_f unless price.nil?
    post
  end

  def self.parse_filename(user_name, content_type)
    ext = Rack::Mime::MIME_TYPES.invert[content_type]
    "#{user_name}/#{SecureRandom.uuid}#{ext}"
  end

  def self.get_post(author_id, post_id)
    author = User.find(author_id)
    raise(UserService::InvalidUserException.new, 'Invalid post author') if author.nil?

    author.posts&.find(post_id)
  end
end
