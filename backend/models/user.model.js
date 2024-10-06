import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }
    ],
    likedPosts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
}, { timestamps: true }, { strict: false })

userSchema.pre("save", async function (next) {
    try {
        if (!(this.isModified("password"))) next()
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } catch (error) {
        next(error)
    }
})


userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema)