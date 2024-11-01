import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({
            success: false,
            message: "No token provided! Login Again",
        });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to authenticate token! Login Again",
            });
        }

        req.user = user;

        next();
    });
};

export default validateToken;
