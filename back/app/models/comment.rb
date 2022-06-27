class Comment
  include Mongoid::Document
  include Mongoid::Timestamps
  field :user_id, type: BSON::ObjectId
  field :content, type: String

  # Validations
  validates_length_of :content, minimum: 1, maximum: 500

  # Embeddings
  belongs_to :post
  embeds_many :likes
  embeds_many :answers
end
