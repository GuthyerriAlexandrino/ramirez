class CommentsController < ApplicationController
  Mongoid.raise_not_found_error = false
  before_action :authorize_request, only: :show
  before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments
  def index
    user = authorize_request
    return if user.nil?

    @comments = user.posts.comments

    render json: @comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    user = authorize_request
    return if user.nil?

  begin
    post = user.post.find(comment_params[:post_id])
    raise Mongoid::Errors::DocumentNotFound.new "This author is not the owner of the specified post" if post.nil?
    comment = post.create(comment_params.reject { |k, v| k == :post_id } )
    render json: c, status: :created
  rescue Mongoid::Errors => e
    render json: { error: e }, status: :bad_request
  end
end

# POST /comments/1
def like # To-do
  user = authorize_request
  params.require([:post_id, :author_id])
  return if user.nil?

  author = User.find(:author_id)
  post = author&.posts&.find(:post_id)
  comment = post&.comments&.find(params[:id])
  like = comment&.likes&.find(user.id)

  return render json: {error: "Invalid post author" }, status: :bad_request if author.nil?
  return render json: {error: "This author is not the owner of the specified post" }, status: :bad_request if post.nil?
  return render json: {error: "This comment don't exists in the specified post" }, status: :bad_request if comment.nil?

  if like.nil?
    comment.likes.create(user.id)
  else
    like.destroy
  end

  render json: {}, status: :ok
end

  # PATCH/PUT /comments/1
  # def update
  #   if @comment.update(comment_params)
  #     render json: @comment
  #   else
  #     render json: @comment.errors, status: :unprocessable_entity
  #   end
  # end

  # DELETE /comments/1
  def destroy
    user = authorize_request
    return if user.nil?

    return render json: { error: 'Specified user is not the owner of the comment' }, status: :bad_request
    
    # Não lembro o que eu tava fazendo
    @comment.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def comment_params
      params.require(:comment).permit(:user_id, :content, :post_id).tap { |c| c.require([:user_id, :content, :post_id]) }
    end
end
