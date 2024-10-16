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

        if (!foundUser)
            return res.status(409).json({
                msg: "User does not Exist"
            })

        if (!(await foundUser?.isPasswordCorrect(password)))
            return res.status(409).json({
                msg: "Incorrect Password"
            })

        const token = jwt.sign({
            _id: foundUser?._id,
            username
        }, process.env.JWT_SECRET, { expiresIn: '1d' })

         return res
         .cookie('token', token, {
             httpOnly: true, 
             secure: process.env.NODE_ENV === 'production', 
             sameSite: 'None', 
             maxAge: 24 * 60 * 60 * 1000 
         })
         .status(200)
         .json({
             msg: "Login Successful",
         });

    } catch (error) {
        return res.status(500).json({
            msg: "Error in Login",
            err: error.message
        })
    }
}