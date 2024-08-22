import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth_JWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // authHeader = Authorization: Bearer <token>
    if (authHeader) {
        
        const token = authHeader.split(' ')[1];
        // console.log("Received token:", token);

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).send("JWT not authorized");
            }

            req.user = user;
            next();
        });
    } else {
        res.status(401).send("Authorized!");
    }
};

export default auth_JWT;
