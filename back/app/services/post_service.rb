module PostService
  def self.user_posts(user_id)
    user = User.find(_id: user_id)
    user.posts
  end

  def self.post(post_id)
    
  end

  def self.post_params(filename, price, uri)
    post = { title: filename, image: uri }
    post[:price] = price.to_f unless price.nil?
    post
  end

  def self.parse_filename(user_name, content_type)
    ext = Rack::Mime::MIME_TYPES.invert[content_type]
    filename = "#{user_name}/#{SecureRandom.uuid}.#{ext}"
  end
end