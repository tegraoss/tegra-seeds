import { NextFunction, Request, Response, Router } from "express";
import { User } from "../model/user";

export const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.query();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

userRouter.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.query().insertAndFetch(req.body);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});


userRouter.patch("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        delete req.body.password;
        delete req.body.email;
        await User.query().patch(req.body).where("id", req.params.id);
        const data = await User.query().select("email", "name", "age", "city").where("id", req.params.id);
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
});

userRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await User.query().delete().where("id", req.params.id);

        if (data) {
            res.status(200).json({ message: "Usuário deletado com sucesso" });
        }
        throw "Usuário não encontrado";

    } catch (err) {
        next(err);
    }
});
