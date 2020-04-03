const connection = require("../database/connection");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

module.exports = {
  async create(req, res) {
    const { id } = req.body;

    const ong = await connection("ongs").where("id", id).select("name").first();

    if (!ong) {
      return res.status(400).json({ error: "No ONG found with this ID" });
    }

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: 86400,
    });

    ong.token = token;

    return res.json(ong);
  },
};
