export const logout = async (req, res) => {
    try {
        return res
        .status(200)
        .clearCookie('token', {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'None',
        })
        .json({
            msg: "Logout successful",
        });
    } catch (error) {
        return res.status(500).json({
            msg: "error logging out",
            err: error.message
        })
    }
}