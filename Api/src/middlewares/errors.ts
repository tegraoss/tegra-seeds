import { NextFunction, Request, Response } from "express";

export function notFound(req: Request, res: Response, next: NextFunction): any {
    return res.status(404).json("No Route Found");
}

export function parser(err: any, req: Request, res: Response, next: NextFunction): any {

    console.log("Body", req.body);
    console.log("Message", err.message);


    return res.status(400).json({
        error: err
    });


    // if (err.status < 100 || err.status >= 600 || !err.status) {
    //     err.status = 500;
    // }

    // res.status(400).json({
    //     ...err
    // });

    //res.status(err.status).send({ error: err.message || "Internal Server Error" });

}


