import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"

export const deleteProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const project = await Post.findById(projectId)

        // Remove Post from Liked Posts
        await User.updateMany({
            likedPosts: projectId
        }, {
            $pull: {
                likedPosts: projectId
            }
        })

        await Post.findByIdAndDelete(projectId)

        const remainingPost = await Post.find({}).populate("owner", "username").select("-likedBy").sort({ createdAt: -1 })
        
        return res.status(200).json({
            msg: "Project Deleted",
            remainingPost
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Error Deleting project",
            err: error.message
        })
    }
}