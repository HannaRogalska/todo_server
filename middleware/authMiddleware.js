import jwt from "jsonwebtoken"
export const authMiddleware = (req, res, next) => {
    const secret = process.env.ACCESS_SECRET;
    const token = req.header("Authorization")
    if (!token) return res.status(401).json({ error: "Access denied" });
    try {
        const decoded = jwt.verify(token, secret);
        req.userId = decoded.userId
        next()
    } catch (err) {
        res.status(401).json({ error: "Invalid token" });
    }
}