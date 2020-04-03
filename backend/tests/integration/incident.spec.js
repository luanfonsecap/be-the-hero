const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("Incident", () => {
  beforeAll(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to return a list of registered incidents", async () => {
    const response = await request(app).get("/incidents");

    expect(Array.isArray(response.body.incidents)).toBe(true);
  });

  it("should be able to create a new Incident", async () => {
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
      .post("/incidents")
      .set("authorization", String.toString(ongId))
      .send({
        title: "Incident Test",
        description: "Description of a incident test",
        value: 100
      });

    expect(response.body).toHaveProperty("id");
  });

  it("should be able to delete an incident", async () => {
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

    const newIncident = await request(app)
      .post("/incidents")
      .set("authorization", String.toString(ongId))
      .send({
        title: "Incident Test",
        description: "Description of a incident test",
        value: 100
      });

    const incidentId = newIncident.body.id;

    const response = await request(app)
      .delete(`/incidents/${incidentId}`)
      .set("authorization", String.toString(ongId));

    expect(response.status).toBe(204);
  });

  it('should be able to update an incident', async () => {
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

    const newIncident = await request(app)
      .post("/incidents")
      .set("authorization", String.toString(ongId))
      .send({
        title: "Incident Test",
        description: "Description of a incident test",
        value: 100
      });

    const incidentId = newIncident.body.id;

    const response = await request(app)
      .put(`/incidents/${incidentId}`)
      .set("authorization", String.toString(ongId))
      .send({
        value: "300"
      });

    expect(response.body).toBe(1)
  })
});
