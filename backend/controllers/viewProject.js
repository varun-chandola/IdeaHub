import mongoose from "mongoose";
import { Post } from "../models/post.model.js"

export const viewProject = async (req, res) => {
    try {
        const { projectId } = req.params
        await Post.findByIdAndUpdate(projectId, {
            $inc: {
                views: 1
            }
        })

        const project = await Post.findById(projectId).populate({
            path: "owner",
            select: "username"
        }).populate({
            path: "comments",
            populate: [{
                path: "owner",
                select: "username"
            },
            {
                path: "replies",
                populate: [{
                    path: 'owner',
                    select: 'username'
                }]
            }]
        })

        const projectComments = await Post.findById(projectId).select('comments')

        return res.json({
            // project: projectById
            project,
            projectComments
        })

    } catch (error) {
        return res.json({
            msg: "Error in seeing post",
            err: error.message
        })
    }
}