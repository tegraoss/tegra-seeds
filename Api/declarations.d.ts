import * as express from 'express';
import { ITokenUser } from './src/middlewares/auth';

declare module "express" {
    interface Request {
        token: ITokenUser;
    }
}