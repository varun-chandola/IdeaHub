import mongoose from "mongoose";
const commentSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        required: true,
        maxLength: 200,
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    likes: {
        type: Number,
        default: 0
    },
}, { timestamps: true })
export const Comment = mongoose.model('Comment', commentSchema)