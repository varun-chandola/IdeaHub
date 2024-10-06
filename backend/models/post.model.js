import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        default: "Beginner",
        required: true
    },
    content: {
        type: String,
        required: true,
        maxLength: 500
    },
    TechStack: [{
        type: String,
        required: true
    }],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true, strict: false })
export const Post = mongoose.model('Post', postSchema)