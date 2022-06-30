class Like
  include Mongoid::Document
  field :user_id, type: BSON::ObjectId
  embedded_in :post
  embedded_in :comment
  embedded_in :answer
end