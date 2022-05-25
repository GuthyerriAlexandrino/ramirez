module FiltersService
  def FiltersService.format_params(params)
    new_hash = {}
    new_hash
  end
  
  def FiltersService.format_location(location)
    locate = [{ photographer: true }]
    locate = [{ city: location }, { state: location }] unless location.nil? || location == ""
    locate
  end
end