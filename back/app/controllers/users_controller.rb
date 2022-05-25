class UsersController < ApplicationController
  before_action :authorize_request, except: :create
  before_action :set_user, only: %i[ show update destroy ]

  # GET /users
  def index
    filters = { photographer: true }
    location = FiltersService.format_location(params[:location])
    @users = User.only([:name, :email, :specialization, :city, :state]).any_of(*location).where(filters)
    render json: @users
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  # def create
  #   @user = User.new(user_params)

  #   if @user.save
  #     render json: @user, status: :created, location: @user
  #   else
  #     render json: @user.errors, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      # @user = find(params[:id])
      @user = []
      @user << User.only([:name, :email, :_id]).where(photographer: false, id: params[:id]).first()
      @user << User.only([:name, :email, :_id, :specialization, :city, :state]).where(photographer: true, id:params[:id]).first()
      @user.compact!
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:name, :email, :photographer, :password, :password_confirmation, :specialization, :city, :state, :updated_at, :created_at)
    end
end
