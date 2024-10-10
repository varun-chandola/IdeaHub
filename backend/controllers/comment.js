import { Comment } from "../models/comment.model.js"
import { Post } from "../models/post.model.js"

export const comment = async (req, res) => {
    try {
        const { projectId } = req.params
        const { comment } = req.body

        if (!comment) return res.status(409).json({
            msg: "Comment Cannot Be Empty"
        })

        if (comment?.length > 200) return res.status(401).json({
            msg: "max limit is 200 characters"
        })

        const newComment = await Comment.create({
            owner: req.user?._id,
            comment,
        })


        const postComments = await Post.findByIdAndUpdate(projectId, {
            $push: {
                comments: newComment?._id
            }
        }, { new: true }).populate({
            path: "comments",
            populate: [{
                path: "owner",
                select: "username"
            }]
        }).select('comments')

        return res.json({
            msg: "commented",
            postComments
        })

    } catch (error) {
        return res.status(500).json({
            msg: "error commenting",
            err: error.message
        })
    }
}