import mongoose from "mongoose"
import { Comment } from "../models/comment.model.js"

export const likeComment = async (req, res) => {
    try {
        const { commentId } = req.body
        const liked = await Comment.findOne({
            _id: commentId,
            likedBy: req.user?._id
        })
        if (liked == null) {
            const likes = await Comment.findByIdAndUpdate(commentId, {
                $inc: {
                    likes: 1
                },
                $push: {
                    likedBy: req.user?._id
                }
            }, { new: true }).select('likes likedBy')
            return res.status(200).json({
                msg: "comment liked",
                likes
            })
        }
        const likes = await Comment.findByIdAndUpdate(commentId, {
            $inc: {
                likes: -1
            },
            $pull: {
                likedBy: req.user?._id
            }
        }, { new: true }).select('likes likedBy')
        return res.status(200).json({
            msg: "comment unliked",
            likes
        })
    } catch (error) {
        return res.status(500).json({
            msg: "error liking comment",
            err: error.message
        })
    }
}