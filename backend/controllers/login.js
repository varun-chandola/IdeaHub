import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"
export const login = async (req, res) => {
    try {
        const { username, password } = req.body
        if (!(username || password)) return res.status(409).json({
            msg: "Both Fields are mandatory"
        })

        const foundUser = await User.findOne({
            username
        })

        if (!(await foundUser?.isPasswordCorrect(password)))
            return res.status(409).json({
                msg: "Incorrect Password"
            })

        const token = jwt.sign({
            _id: foundUser?._id,
            username
        })

        return res.status(200).cookie('token', token).json({
            msg: "Login Successfull",
            foundUser,
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Error in Login",
            err: error.message
        })
    }
}