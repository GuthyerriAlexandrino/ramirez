class UsersController < ApplicationController
  before_action :authorize_request, except: [:create, :show]
  before_action :set_user, only: :show

  # GET /users
  def index
    filters = FiltersService.format_params(request.GET)
    location = FiltersService.format_location(request.GET[:location])
    @users = User.only(UserService.search_view).where(filters)
    @users = @users.any_of(*location) unless location.empty?
    render json: @users
  end

  # GET /users/1
  def show
    user = authorize_request

    p View.find()
    render json: @user
  end

  def set_img
    fs = FireStorageService.instance
    fs = fs.img_bucket
    file = fs.file("pexels-ylanite-koppens-2479246.jpg")
    #send_file image, :type => file.content_type, :disposition => file.content_disposition
    render json: file.media_url, status: :ok
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

  def update
    user = authorize_request
    return if user.nil?

    return render json: {error: "Invalid user token"}, status: :unprocessable_entity if user.email != user_params[:email]

    if user.update(user_params)
      render json: user
    else
      render error: {json: user.errors, status: :unprocessable_entity}
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.without(:password_digest, :password).where(id: params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(UserService.all_permited)
    end
end
