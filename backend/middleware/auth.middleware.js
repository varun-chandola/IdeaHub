import jwt from "jsonwebtoken"

export const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req?.cookies
        if(!token) return res.status(401).json({
            msg:"unauthorized ! Login First"
        })
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