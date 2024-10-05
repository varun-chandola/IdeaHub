import { User } from "../models/user.model.js"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!(username || password))
            return res.status(409).json({
                msg: "All Fields are mandatory"
            })

        const foundUser = await User.findOne({
            username
        })

        if (foundUser) return res.status(409).json({
            msg: "Username Taken"
        })

        const newUser = await User.create({
            username,
            password
        })

        const token = jwt.sign({
            _id: newUser?._id,
            username
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

        return res.status(200).cookie('token', token).json({
            msg: "Signup Successfull",
            newUser
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Signup Error",
            err: error.message
        })
    }
}