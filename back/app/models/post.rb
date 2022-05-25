class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :img, type: String
  field :price, type: Float
  field :likes, type: Integer
  belongs_to :user
  has_many :comments
end
