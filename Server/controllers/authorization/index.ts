import { Request, Response } from "express";
import { validationResult } from "express-validator/check";
import { AuthorizationModel } from "../../models/Authrorization/index";

const login = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        const NewUser = await new AuthorizationModel(req.body).login();
        setTimeout(()=>{
            return res.status(NewUser.status).json(NewUser);
        }, 2000);
    }
}

export { login };
