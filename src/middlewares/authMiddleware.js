import jwt, { decode } from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']
    //const TOKEN = req.headers['autherization'].split(' ')[1]
    if (!token) {
        console.log("No token provided in headers:", req.headers);
        return res.status(401).json({ message: "No token provided." })
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification error:", err);
            return res.status(401).json({ message: "Invalid token!" })
        }

        req.userId = decoded.id
        //console.log("req.userId", req.userId)
        next()
    })
}

export default authMiddleware