const connection = require("../database/connection");

module.exports = {
  async index(req, res) {
    const ong_id = req.userId;

    if (!ong_id) {
      return res.status("401").json({ error: "Operation not permitted." });
    }

    const ong = await connection("ongs")
      .where("id", ong_id)
      .first()
      .select("*");

    if (!ong) {
      return res.status("404").json({ error: "This ONG does not exists." });
    }

    const incidents = await connection("incidents")
      .where("ong_id", ong_id)
      .select("*");

    return res.json(incidents);
  },
};
