import * as dotenv from "dotenv";
dotenv.load();

import * as db from "./db";

import * as express from "express";
import * as bodyParser from "body-parser";
import { authMiddleware } from "./middlewares/auth";
import * as errors from "./middlewares/errors";
import { loginRouter } from "./router/login-router";
import { userRouter } from "./router/user-router";
import * as cors from "cors";
//import * as swaggerUi from "swagger-ui-express";
//import * as swaggerDoc from "./app/swagger/swagger.json";
//import { authRouter } from "./app/controllers/authController";
//import { Server, HttpError } from "typescript-rest";
//import { controllers } from "./app/controllers";

// DATABASE
db.connectAndMigrate();

// INITIALIZE SERVER
const app = express();

app.use(cors());

// DEFAULT MIDDLEWARES
app.use(bodyParser.json({ limit: "5mb" }));

app.use("/login", loginRouter);

app.use(authMiddleware);

app.use("/users", userRouter);

app.use(errors.notFound);
app.use(errors.parser);

// LISTEN TO PORT
let port = 3000;
app.listen(port, () => console.log("Example app listening on port " + port + "!"));

module.exports = app;
