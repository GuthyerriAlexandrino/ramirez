module FiltersService
  def self.matching_params(params)
    new_hash = { photographer: true }
    params.each_pair { |k, v| new_hash[k.to_sym] = v if self.check_param(k, v) }
    new_hash[:name] = /.*#{params[:name]}.*/ unless params[:name].nil? || params[:name] == ""
    new_hash[:specialization.exists] = true
    new_hash
  end
  
  def self.location_params(location)
    locate = []
    locate = [{ city: location }, { state: location }] unless location.nil? || location == ""
    locate
  end

  def self.order_params(order_by)
    order = {}
    order = {order_by.to_sym => :desc} if order_by != "" && %w[likes views price].include?(order_by)
    order
  end

  def self.price_params(params)
    price = {}
    min_price = (params[:min_price].nil? ? nil : params[:min_price].to_f)
    max_price = (params[:max_price].nil? ? nil : params[:max_price].to_f)
    return {} if min_price.nil? && max_price.nil?

    if min_price.nil?
      price = {:services_price.elem_match => {:$lte => max_price} }
    elsif max_price.nil?
      price = {:services_price.elem_match => {:$gte => min_price} }
    else 
      price = {:services_price.elem_match => {:$gte => min_price, :$lte => max_price} }
    end   
    price
  end

  def self.check_pagination(page)
    page.nil? || (Integer(params[:page]) rescue false)
  end

  private
  def self.check_param(key, value)
    key = key.to_sym
    condition1 = %i[name specialization].include?(key)
    condition2 = value != "" && !value.nil?

    condition1 && condition2
  end
end