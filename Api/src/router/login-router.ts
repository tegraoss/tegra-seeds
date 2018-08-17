import { NextFunction, Request, Response, Router } from "express";
import { User } from "../model/user";
import * as bcrypt from "bcryptjs";
import { getUserToken } from "../service/user-service";


export const loginRouter = Router();

loginRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = await getUserToken(req.body);
        res.status(200).json({ token: token });
    } catch (err) {
        next(err);
    }
});

loginRouter.post("/register", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const model = req.body;

        console.log(model);

        const user = await User.query().findOne({ email: model.email });
        if (user) {
            throw "Usuário já existente";
        }

        const plainPassword = model.password;

        // Encrypts password
        model.password = bcrypt.hashSync(model.password, Number(process.env.BCRYPT_SALT_NUMBER));

        // Encrypted
        const createdUser = await User.query().insertAndFetch(model);
        delete createdUser.password;

        // Returns a token
        const token = await getUserToken({
            email: model.email,
            password: plainPassword
        });
        res.status(200).json({ token: token });
    } catch (err) {
        next(err);
    }
});
