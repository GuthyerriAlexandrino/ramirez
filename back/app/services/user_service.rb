module UserService
  def UserService.all_permited
    [:name, :email, :photographer, :password, :password_confirmation,
      :city, :state, :services_price => [],
      :bio, :profile_img, :specialization => []]
  end

  def UserService.search_view
    [:name, :email, :profile_img, :specialization, :services_price, :city, :state, :views]
  end
end