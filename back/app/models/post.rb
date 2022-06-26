class Post
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :image, type: String
  field :price, type: Float
  embedded_in :user
  embeds_many :likes
  has_many :comments
end
