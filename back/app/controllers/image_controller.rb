class ImageController < ApplicationController
  before_action :authorize_request, except: [:create, :debug_update]
  before_action :set_user, only: :show

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
      params.require(:user).permit(UserService.all_permited)
    end
end
