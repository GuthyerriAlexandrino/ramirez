class RegistrationController < ApplicationController
  ActionController::Parameters.action_on_unpermitted_parameters = :raise
  VALID_EMAIL_REGEX = /\A([\w+\-]\.?)+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
  HOURS = 2.hours
  SPECIALIZATIONS = SpecializationService.instance.specializations

  def login
    user_params = login_params
    begin
      @user = User.find_by(email: user_params[:email].downcase)
    rescue
      return render json: { error: 'Unauthorized' }, status: :unauthorized
    end

    if @user&.authenticate(user_params[:password])
      token = JsonWebToken.encode(user_id: @user.id, exp: HOURS.from_now)
      time = Time.now + HOURS.to_i
      render json: { token: token, exp: time.strftime("%Y-%m-%d#{'T'}%H:%M"),
                      user: @user._id }, status: :ok
    else
      render json: { error: 'Unauthorized' }, status: :unauthorized
    end
  end
  
  def register
    user_params = register_params()
    return render json: { error: 'Invalid email' }, status: :bad_request unless user_params[:email] =~ VALID_EMAIL_REGEX
    return render json: { error: 'Password too short'}, status: :bad_request unless user_params[:password].length >= 8
    return render json: { error: 'Specialization don\'t exists'}, status: :bad_request unless SPECIALIZATIONS.include?(user_params[:specialization])

    begin
      u = User.create(user_params.permit(user_params.keys).to_h)
      u.password = nil
      render json: u, status: :ok
    rescue Mongo::Error::OperationFailure => e
      render json: { error: e.to_s.split()[1]}, status: :conflict
    end
  end

  def register_all_fields
    user = authorize_request
    render "aa" unless user.nil?
  end

  ## Renderiza o AA só se user for nil, atualizar email gda
    
  private
  
  def login_params
    params.require(:user).permit(:email, :password).tap { |u| u.require([:email, :password]) }
  end

  def register_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :specialization, :city, :state, :photographer).tap do |u|
      u.require([:name, :email, :password, :password_confirmation, :photographer])
    end
  end

  def register_all_fields_params
    params.require(:user).permit(:name, :email, :specialization, :city, :state, :bio, :services_price)
  end
end
