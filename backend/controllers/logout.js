export const logout = async (req, res) => {
    try {
        return res.status(200).clearCookie('token').json({
            msg: "logout",
        })
    } catch (error) {
        return res.status(500).json({
            msg: "error logging out",
            err: error.message
        })
    }
}