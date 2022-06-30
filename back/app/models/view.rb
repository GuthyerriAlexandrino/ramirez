class View
  include Mongoid::Document
  field :photographer, type: BSON::ObjectId
  belongs_to :user
end
