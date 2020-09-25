import { Router } from "express";
import path from "path";

const route = Router();

export default () => {
    route.get("/", (req, res) => {
        res.sendFile(path.join(process.cwd(), "src/assets/public/index.html"));
    });

    return route;
};
