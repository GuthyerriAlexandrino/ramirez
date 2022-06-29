class CommentsController < ApplicationController
  Mongoid.raise_not_found_error = false
  before_action :authorize_request, only: %i[show index]
  before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments/{post_id}
  def index
    @comments = Comment.all.where({post_id: params[:id]})
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
    return render json: { error: 'User is not photographer' } unless user.photographer
    return render json: { error: 'Invalid image' } if params[:image].nil?

    begin
      author = User.find(comment_params[:user_id])
      post = author&.posts.find(comment_params[:post_id])
      raise Mongoid::Errors::DocumentNotFound.new(User, comment_params[:user_id]) if author.nil?
      raise Mongoid::Errors::DocumentNotFound.new(Post, comment_params[:post_id]) if post.nil?
      com_params = { user_id: user.id , content: comment_params[:content] }
      comment = post.comments.create!(com_params)
      render json: comment, status: :created
    rescue Mongoid::Errors => e
      render json: { error: e }, status: :bad_request
    end
  end

  # POST /comments/1
  def like
    user = authorize_request
    return if user.nil?

    com_params = params.require(:comments).permit(:post_id, :author_id, :id)

    author = User.find(com_params[:author_id])
    post = author&.posts&.find(com_params[:post_id])
    comment = post&.comments&.find(com_params[:id])
    like = comment&.likes&.find_by(user_id: user.id)

    return render json: {error: "Invalid post author" }, status: :bad_request if author.nil?
    return render json: {error: "This author is not the owner of the specified post" }, status: :bad_request if post.nil?
    return render json: {error: "This comment don't exists in the specified post" }, status: :bad_request if comment.nil?

    if like.nil?
      begin 
        comment.likes.create!(user_id: user.id)
      rescue Mongoid::Errors => e
        return render 
      end
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
