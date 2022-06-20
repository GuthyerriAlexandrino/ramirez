class PostsController < ApplicationController
  before_action :authorize_request, except: :create
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
    return if user.nil? || params[:img].nil?
    
    p params[:img]

    return 0

    @post = Post.new(post_params)
    user.posts << @post

    if @post.save
      render json: @post, status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    @post.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = PostService.user_posts(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:title, :price).tap { |u| u.require(:title) }
    end
end
