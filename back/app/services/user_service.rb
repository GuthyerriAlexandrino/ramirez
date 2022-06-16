module UserService
  def UserService.all_permited
    [:name, :email, :photographer, :password, :password_confirmation,
      :specialization, :city, :state, :services_price, :views,
      :bio, :profile_img, :updated_at, :created_at]
  end

  def UserService.search_view
    [:name, :email, :specialization, :city, :state]
  end
end