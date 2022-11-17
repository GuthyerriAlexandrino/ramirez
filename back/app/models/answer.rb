class Answer
  include Mongoid::Document
  include Mongoid::Timestamps
  field :user_id, type: BSON::ObjectId
  field :answer_ref_id, type: BSON::ObjectId, default: nil
  field :content, type: String

  # Validations
  validates_length_of :content, minimum: 1, maximum: 500

  embedded_in :comment
  embeds_many :likes
end
