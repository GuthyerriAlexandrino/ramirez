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

  # Validations
  validates_length_of :name, minimum: 3, maximum: 160
  validates_length_of :services_price, minimum: 2, maximum: 2
  validates_length_of :city, minimum: 1, maximum: 70
  validates_length_of :state, minimum: 2, maximum: 2
  validates_length_of :bio, minimum: 20, maximum: 1000

  validates_numericality_of :views, only_integer: true

  validates_uniqueness_of :email

  # Embeddings
  embeds_many :posts
  has_one :view
end
