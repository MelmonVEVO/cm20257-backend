import { mysql } from "../server";

export function send(res, content: object) {
  res.status(200);
  res.send(content);
}

export function end(res) {
  res.status(204).end();
}

export function error(res) {
  res.status(500).end();
}

export async function query(res, query: string, args: Array<string | number> = [], queryRes: boolean = true): Promise<any | null> {
  let batch = `BEGIN;${query}COMMIT;`;

  try {
    let results = await mysql.query(batch, args);
    if (!queryRes || !results)
      return res.status(204).end();

    return results[1];
  } catch {
    error(res);
  }

  return null;
}
