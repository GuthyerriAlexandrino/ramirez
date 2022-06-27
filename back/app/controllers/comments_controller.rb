class CommentsController < ApplicationController
  before_action :set_comment, only: %i[ show update destroy ]

  # GET /comments
  # def index
  #   @comments = Comment.all

  #   render json: @comments
  # end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    user = authorize_request

    return if user.nil?

  begin
    c = user.post.find(comment_params[:post_id]).create(comment_params.reject { |k, v| k == :post_id } )
    render json: c, status: :created
  rescue Mongo::Error => e
    render json: { error: e }, status: :bad_request
  end
end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
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
