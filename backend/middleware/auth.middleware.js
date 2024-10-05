import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req?.cookies
        // console.log("token\n", token)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({
            msg: "Error in Auth Middleware",
            err: error.message
        })
    }
}