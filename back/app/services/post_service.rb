module PostService
  def PostService.user_posts(user_id)
    user = User.find(_id: user_id)
    return user.posts
  end
end