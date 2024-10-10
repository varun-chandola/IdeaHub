import { Comment } from "../models/comment.model.js"
import { Post } from "../models/post.model.js"

export const reply = async (req, res) => {
    try {
        const { commentId } = req.params
        const { replyContent, projectId } = req.body

        if (!replyContent) return res.status(409).json({
            msg: "Reply Cannot Be Empty"
        })

        const reply = await Comment.create({
            owner: req.user?._id,
            comment: replyContent?.trim(),
        })

        await Comment.findByIdAndUpdate(commentId, {
            $push: {
                replies: reply?._id
            }
        }, { new: true })

        const commentAndreplies = await Post.findById(projectId).populate('owner', 'username').populate({
            path: "comments",
            populate: [{
                path: "owner",
                select: "username"
            }]
        })

        return res.status(200).json({
            msg: `replied to comment`,
            commentAndreplies
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Error replying",
            err: error.message
        })
    }
} 