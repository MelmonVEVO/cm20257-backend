import * as bodyParser from "body-parser";
import * as express from "express";

import routes from "./endpoints/routes";
import * as log from "./logging";
import { MySQLPool } from "./mysqlPool";

export const mysql = new MySQLPool();
mysql.create();

log.logInfo("Starting server...");

let app = express();

app.disable("x-powered-by");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  log.logInfo(`${req.method} ${req.url}`);
  next();
});

app.use(routes);

app.use((req, res) => {
  res.status(404);
  res.end();
});

const PORT = 8080;
app.listen(PORT, () => log.logInfo(`Server listening on port ${PORT}...`));
