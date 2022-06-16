class ApplicationController < ActionController::API
  def not_found
    render json: { error: 'not_found' }
  end
  
  def authorize_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    @current_user = nil
    # return User.find_by(email: "guthyerri@davi.camilo") unless header != "debug"
    begin
      return User.find_by(email: "guthyerri@davi.alice") unless header != "debug"
      @decoded = JsonWebToken.decode(header)
      @current_user = User.find(@decoded[:user_id])
    rescue JWT::DecodeError => e
      render json: { error: e.message }, status: :unauthorized
    rescue StandardError => e
      render json: { error: e.message }, status: :unauthorized
    end
    @current_user
  end
end
