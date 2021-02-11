export function send(res, content: object) {
  res.status(200);
  res.end(content);
}
