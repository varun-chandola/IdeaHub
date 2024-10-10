import { Comment } from "../models/comment.model.js"
import { Post } from "../models/post.model.js"

export const deleteComment = async (req, res) => {
    try {
        const { commentId, projectId } = req.params
        await Comment.findByIdAndUpdate(commentId, {
            $set: {
                replies: null
            }
        }, { new: true })

        await Post.findByIdAndUpdate(projectId, {
            $pull: {
                comments: commentId
            }
        }, { new: true })
        
        const restComments = await Post.findById(projectId).populate({
            path: "comments",
            populate: [{
                path: "owner",
                select: "username"
            }]
        }).populate("owner", "username")

        return res.status(200).json({
            msg: "Comment Deleted",
            restComments
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Error Deleting Comment",
            err: error.message
        })
    }
}