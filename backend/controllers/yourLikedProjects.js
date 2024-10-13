import { Post } from "../models/post.model.js"

export const yourLikedProjects = async (req, res) => {
    try {
        const yourLikedProjects = await Post.find({
            likedBy: req.user?._id,
        }).populate("owner", "username")
        return res.status(200).json({
            msg: "Your Liked Projects",
            yourLikedProjects
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error Fetching Your liked Projects",
            err: error.message
        })
    }
}