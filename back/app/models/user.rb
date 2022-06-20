class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword
  has_secure_password
  before_save { self.email.downcase! }

  field :name, type: String
  field :email, type: String
  field :password, type: String
  field :password_digest, type: String
  field :specialization, type: Array
  field :city, type: String
  field :state, type: String
  field :services_price, type: Array, default: [0.0, 0.0]
  field :views, type: Integer, default: 0
  field :bio, type: String, default: ""
  field :profile_img, type: String, default: ""
  field :photographer, type: Boolean
  index({ email: 1 }, { unique: true })
  embeds_many :posts
  has_one :view
end
