import { Comment } from "../models/comment.model.js"

export const likeReply = async (req, res) => {
    try {
        const { replyId, commentId } = req.body
        const replyLiked = await Comment.findOne({
            _id: commentId,
            "replies._id": replyId,
            "replies.likedBy": req?.user?._id
        })

        if (replyLiked == null) {
            const liked = await Comment.findOneAndUpdate({
                _id: commentId,
                "replies._id": replyId,
                "replies.likedBy": req?.user?._id
            } , {
                // $push:
            })
        }
        return res.status(200).json({
            msg: "Liked Reply",
            comment
        })
    } catch (error) {
        return res.status(500).json({
            msg: "error liking comment",
            err: error.message
        })
    }
}