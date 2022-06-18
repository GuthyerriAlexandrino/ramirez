module UserService
  def UserService.all_permited
    [:name, :email, :photographer, :password, :password_confirmation,
      :city, :state, :services_price, :views,
      :bio, :profile_img, :specialization => []]
  end

  def UserService.search_view
    [:name, :email, :specialization, :city, :state]
  end
end