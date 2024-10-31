import jwt from "jsonwebtoken";

const validateToken = async (req, res, next) => {
    const header = req.headers["authorization"];
    if (!header) {
        return res.status(403).json({ error: "No token provided" });
    }

    const token = header.slice(7);

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res
                .status(500)
                .json({ error: "Failed to authenticate token" });
        }

        req.user = user;

        next();
    });
};

export default validateToken;
