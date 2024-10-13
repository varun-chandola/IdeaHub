import { Comment } from "../models/comment.model.js";
import { Post } from "../models/post.model.js";

export const likeReply = async (req, res) => {
    try {
        const { replyId, projectId } = req.body;
        const replyLiked = await Comment.findOne({
            _id: replyId,
            likedBy: req?.user?._id,
        });

        if (replyLiked) {
            await Comment.findByIdAndUpdate(
                replyId,
                {
                    $inc: { likes: -1 },
                    $pull: { likedBy: req?.user?._id },
                },
                { new: true }
            );
            const commentsWithLikedReply = await Post.findById(projectId).populate('owner', 'username')
            return res.status(200).json({
                msg: "Unliked Reply",
                commentsWithLikedReply
            });
        } else {
            await Comment.findByIdAndUpdate(
                replyId,
                {
                    $inc: { likes: 1 },
                    $push: { likedBy: req?.user?._id },
                },
                { new: true }
            );

            // const commentsWithLikedReply = await Post.findById(projectId).populate({
            //     path: "comments",
            //     populate: [{
            //         path: "owner",
            //         select: "username"
            //     }]
            // }).populate("owner", "username").select('comment')
            const commentsWithLikedReply = await Post.findById(projectId).populate('owner', 'username').populate({
                path: "comments",
                populate: [{
                    path: "owner",
                    select: "username"
                }]
            }).populate({
                path: "comments",
                populate: [{
                    path: "replies",
                    populate: [{
                        path: "owner",
                        select: "username"
                    }]
                }]
            })

            return res.status(200).json({
                msg: "Liked Reply",
                commentsWithLikedReply
            });
        }
    } catch (error) {
        return res.status(500).json({
            msg: "error liking reply",
            err: error.message,
        });
    }
};
