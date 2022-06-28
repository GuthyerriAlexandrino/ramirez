class PostsController < ApplicationController
  before_action :authorize_request, only: :show
  before_action :set_post, only: %i[ show update]

  # GET /posts/1
  def show
    render json: @post
  end

  # POST /posts
  def create
    user = authorize_request
    return if user.nil? || params[:image].nil?
    
    bucket = FireStorageService.instance.img_bucket
    file_uploaded = params[:image].tempfile
    filename = PostService.parse_filename(user.name, params[:image].content_type)
    res = bucket.create_file(file_uploaded, filename)
    post_hash = PostService.post_params(filename, params[:price], res.name)
    
    begin
      p = Post.new(post_hash)
      user.posts << p
      render json: p, status: :created
    rescue Mongoid::Error => e
      bucket.file(filename).delete
      render error: e, status: :unprocessable_entity
    end
  end

  # POST /posts/1
  def like
    user = authorize_request
    return if user.nil?


  end

  # DELETE /posts/1
  def destroy
    user = authorize_request
    return if user.nil?

    post = user.posts.find(params[:id])

    bucket = FireStorageService.instance.img_bucket
    bucket.file(post.image).delete
    user.delete(post)
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = PostService.user_posts(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.permit(:image, :price).tap { |p| p.require(:image) }
    end
end
