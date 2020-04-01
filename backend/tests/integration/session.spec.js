const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Session", () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to return a ONG id to login", async () => {
    const newOng = await request(app)
      .post("/ongs")
      .send({
        name: "ONG",
        email: "ong@contact.com",
        whatsapp: "31000000000",
        city: "Belo Horizonte",
        uf: "MG"
      });

    const ongId = newOng.body.id;

    const response = await request(app)
      .post("/sessions")
      .send({
        id: ongId
      });

    expect(response.body).toHaveProperty("name");
    expect(response.body.name).toBeTruthy();
  });
});
