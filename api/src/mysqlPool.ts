import * as mysql from "mysql";

import * as log from "./logging";

export class MySQLPool {

  private host: string;
  private user: string;
  private password: string;
  private database: string;

  private pool: mysql.Pool | null;

  constructor() {
    let { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

    if (!DB_HOST || !DB_USER || !DB_PASSWORD || !DB_NAME)
      throw new Error("Database credentials missing!");

    this.host = DB_HOST;
    this.user = DB_USER;
    this.password = DB_PASSWORD;
    this.database = DB_NAME;
    this.pool = null;
  }

  create(): void {
    this.pool = mysql.createPool({
      connectionLimit: 32,
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
      multipleStatements: true
    });
  }

  private getConnection(): Promise<mysql.PoolConnection> {
    return new Promise((resolve, reject) => {
      this.pool.getConnection((err, conn) => {
        if (err) {
          log.logError(["Failed to obtain MySQL connection!", err]);
          reject(err);
          return;
        }

        resolve(conn);
      });
    });
  }

  async query(query: string, args: Array<string | number> | string | number): Promise<any> {
    if (this.pool == null)
      return;

    if (!Array.isArray(args))
      args = [args];

    let conn = await this.getConnection();

    return new Promise((resolve, reject) => {
      conn.query(query, args, (err, result) => {
        if (err) {
          log.logError(["Failed to execute MySQL query", err]);
          reject(err);
          return;
        }

        resolve(result);
      });
      conn.release();
    });
  }
}
