import {
  query,
  send
} from "../utils";

const SQL_GET_FAVOURITES = `
  SELECT
    Favourites.\`id\`,
    Recipes.\`title\`,
    Recipes.\`time\`,
    Recipes.\`ingredients\`,
    Recipes.\`imageUrl\`,
    Recipes.\`url\`
  FROM Favourites
  LEFT JOIN Recipes ON Favourites.\`recipe\` = Recipes.\`id\`
  WHERE Favourites.\`user\` = ?;
`;

export default async function getFavourites(req, res) {
  let user = req.user;
  let results = await query(res, SQL_GET_FAVOURITES, user);
  send(res, results[0]);
}
