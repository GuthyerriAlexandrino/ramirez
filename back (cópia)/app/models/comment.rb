class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :user_id, type: BSON::ObjectId
  field :content, type: String
  belongs_to :post
  embeds_many :likes
  embeds_many :answers
end
