module FiltersService
  def FiltersService.format_params(params)
    new_hash = { photographer: true }
    params.each_pair { |k, v| new_hash[k.to_sym] = v unless k == :location || v == "" }
    new_hash[:name] = /.*#{params[:name]}.*/ unless params[:name].nil? || params[:name] == ""
    new_hash
  end
  
  def FiltersService.format_location(location)
    locate = []
    locate = [{ city: location }, { state: location }] unless location.nil? || location == ""
    locate
  end
end