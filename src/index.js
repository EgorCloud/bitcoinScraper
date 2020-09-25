import express from "express";

import bodyParser from "body-parser";
import formData from "express-form-data";
import os from "os";
import config from "./config/env";
import routes from "./api/routes";
import mongo from "./api/db";

(async function start() {
    await mongo(config.mongoDbUri);

    const app = express();

    app.use(
        formData.parse({
            uploadDir: os.tmpdir(),
            autoClean: true,
        })
    );
    app.use("/", express.static("src/assets/public"));
    // delete from the request all empty files (size == 0)
    app.use(formData.format());

    // Middleware that transforms the raw string of req.body into json
    app.use(bodyParser.json());

    // url encoded to body
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use("/", routes(config));

    app.set("PORT", config.port);

    app.listen(app.get("PORT"), () => {
        console.log(`Server running on port ${app.get("PORT")}`);
    });
})();
