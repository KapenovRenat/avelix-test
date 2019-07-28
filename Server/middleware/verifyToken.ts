import jwt from "jsonwebtoken";
import { config } from "../configuration";

const verifyToken = (req: any, res: any, next: any) => {
    if (req.headers.authorization === undefined) {
        res.status(401).json({errors: [{value: "Token not provided"}] });
    } else {
        const Token = req.headers.authorization.split(" ")[1];
        jwt.verify(Token, config.secret, (err: any, result: any) => {
            if (err) {
                res.status(401).json({ errors: [{value: "Token Expired"}] });
            } else {
                // @ts-ignore
                req.body.User_ID = (result as any).User_id;
                next();
            }
        });
    }
};

export { verifyToken };
