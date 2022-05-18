class User
  include Mongoid::Document
  include Mongoid::Timestamps
  field :name, type: String
  field :email, type: String
  field :password, type: String
  field :specialization, type: String
  field :city, type: String
  field :state, type: String
end
