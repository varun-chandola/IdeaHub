import { Post } from "../models/post.model.js"
import { User } from "../models/user.model.js"

export const likeProject = async (req, res) => {
    try {
        const { projectId } = req.params
        const liked = await User.findOne({
            _id: req?.user?._id,
            likedPosts: projectId
        })

        if (liked == null) {
            const userLiked = await User.findByIdAndUpdate(req.user?._id, {
                $push: {
                    likedPosts: projectId
                }
            }, { new: true }).select('likedPosts')

            await Post.findByIdAndUpdate(projectId, {
                $inc: {
                    likes: 1
                },
                $push: {
                    likedBy: req?.user?._id
                }
            }, { new: true })

            return res.status(200).json({
                msg: "Liked",
                userLiked,
            })
        } else {
            const userUnLiked = await User.findByIdAndUpdate(req?.user?._id, {
                $pull: {
                    likedPosts: projectId
                }
            }, { new: true }).select('likedPosts')


            await Post.findByIdAndUpdate(projectId, {
                $inc: {
                    likes: -1
                },
                $pull: {
                    likedBy: req?.user?._id
                }
            }, { new: true }).select('likes')

            return res.status(200).json({
                msg: "Removed Like",
                userUnLiked,
            })
        }

    } catch (error) {
        return res.status(500).json({
            msg: "failed to like/unlike Post",
            error
        })
    }
}