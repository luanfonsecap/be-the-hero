const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Profile", () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to return a list of incidents related an ong", async () => {
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
      .get("/profile")
      .set("authorization", ongId);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should not return any incident of a an unregistered ONG", async () => {
    const response = await request(app)
      .get("/profile")
      .set("authorization", Math.round());

    expect(response.body).toHaveProperty("error");
    expect(response.status).toBe(404);
  });
});
