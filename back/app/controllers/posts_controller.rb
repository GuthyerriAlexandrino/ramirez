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
    return if user.nil? || params[:image].nil?
    
    bucket = FireStorageService.instance.img_bucket
    file_uploaded = params[:image].tempfile
    ext = Rack::Mime::MIME_TYPES.invert[params[:image].content_type]
    filename = "#{user.name}/#{SecureRandom.uuid}.#{ext}"
    res = bucket.create_file(file_uploaded, filename)
    post_hash = {
      title: filename,
      image: res.name,
    }
    post_hash[:price] = params[:price] unless params[:price].nil?
    
    begin
      @post = Post.new(post_hash)
      user.posts << @post

      if @post.save
        render json: @post, status: :created, location: @post
      else
        bucket.file(filename).delete
        render json: @post.errors, status: :unprocessable_entity
      end
    rescue StandardError => e
      bucket.file(filename).delete
      render error: e, status: :unprocessable_entity
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
