class UsersController < ApplicationController
  ActionController::Parameters.action_on_unpermitted_parameters = :raise
  before_action :authorize_request, except: [:create, :update, :show]
  before_action :set_user, only: :show

  # GET /users
  def index
    filters = FiltersService.matching_params(request.GET)
    location = FiltersService.location_params(request.GET[:location])
    order = FiltersService.order_params(request.GET[:orderBy])
    price = FiltersService.price_params(min_price: request.GET[:minPrice], max_price: request.GET[:maxPrice])
    @users = User.where(filters.merge(price)).only(UserService.search_view).order_by(order)
    @users = @users.any_of(*location) unless location.empty?
    render json: @users
  end

  # GET /users/1
  def show
    user = authorize_request
    unless View.where(:user => user.id, :photographer => @user.id).exists?
      View.create(user: user.id, photographer: @user.id)
      unless @user.update(views: @user.views + 1)
        View.delete(user: user.id, photographer: @user.id)
      end
    end
    @user.password_digest = nil
    @user.email = nil
    render json: @user
  end

  def set_img
    fs = FireStorageService.instance
    fs = fs.img_bucket
    file = fs.file("pexels-ylanite-koppens-2479246.jpg")
    render json: file.media_url, status: :ok
  end

  def update
    user = authorize_request
    return if user.nil?

    return render json: {error: "Invalid user token"}, status: :unprocessable_entity if user.id != user_params[:id]

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
      @user = User.where(id: params[:id]).first
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(UserService.all_permited)
    end
end
