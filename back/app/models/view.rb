class View
  include Mongoid::Document
  field :user, type: BSON::ObjectId
  field :photographer, type: BSON::ObjectId
  belongs_to :user, counter_cache: :views
end
