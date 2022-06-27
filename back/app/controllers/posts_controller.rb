class PostsController < ApplicationController
  before_action :authorize_request, only: :show
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    # @posts = Post.All
    # render json: @posts
  end

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
      user.posts << Post.new(post_hash)
    rescue Mongo::Error => e
      bucket.file(filename).delete
      render error: e, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  # def update
  #   if @post.update(post_params)
  #     render json: @post
  #   else
  #     render json: @post.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /posts/1
  def destroy
    user = authorize_request

    user.posts.clear
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      # @post = PostService.user_posts(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.permit(:image, :price).tap { |p| p.require(:image) }
    end
end
