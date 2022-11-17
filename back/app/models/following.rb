class Following
  include Mongoid::Document
  field :user_id, type: BSON::ObjectId
  embedded_in :user
end
