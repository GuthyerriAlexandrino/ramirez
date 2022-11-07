# frozen_string_literal: true

module CommentService
  def self.get_comment(comment_id, post)
    comment = post.comments&.find(comment_id)
    raise InvalidCommentException.new, "This comment don't exists in the specified post" if comment.nil?

    comment
  end

  class InvalidCommentException < StandardError; end
end
