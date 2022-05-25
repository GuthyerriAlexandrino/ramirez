class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :user_id, type: BSON::ObjectId
  field :name, type: String
  field :content, type: String
  field :likes, type: Integer
  embedded_in :post
  embeds_many :answers
end
