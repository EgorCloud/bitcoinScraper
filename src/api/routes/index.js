import { Router } from "express";
import apiRoute from "./apiRoute";
import indexRoute from "./indexRoute";

const app = Router();

export default (config) => {
    app.use("/", indexRoute());
    app.use("/bitcoin", apiRoute(config));

    return app;
};
