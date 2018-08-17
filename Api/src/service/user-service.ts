import { User } from "../model/user";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

export async function getUserToken(model: any): any {
    const user = await User.query().findOne({ email: model.email });
    if (!user) {
        throw "Dados inválidos";
    }

    const checkPassword = bcrypt.compareSync(model.password, user.password);

    if (!checkPassword) {
        throw "Dados inválidos";
    }

    const tokenContent: any = {
        email: user.email,
        id: user.id
    };

    const token = jwt.sign(tokenContent, process.env.JWT_SECRET);

    return token;
}
