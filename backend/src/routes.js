const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const SessionController = require("./controllers/SessionController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");

const SessionsValidator = require("./validators/SessionsValidator");
const ProfileValidator = require("./validators/ProfileValidator");
const OngValidator = require("./validators/OngValidator");
const IncidentValidator = require("./validators/IncidentValidator");

const routes = express.Router();

routes.post(
  "/sessions",
  celebrate(SessionsValidator.create),
  SessionController.create
);

routes.get("/ongs", OngController.index);

routes.post("/ongs", celebrate(OngValidator.create), OngController.create);

routes.get(
  "/profile",
  celebrate(ProfileValidator.index),
  ProfileController.index
);

routes.get(
  "/incidents",
  celebrate(IncidentValidator.index),
  IncidentController.index
);

routes.post(
  "/incidents",
  celebrate(IncidentValidator.create),
  IncidentController.create
);

routes.delete(
  "/incidents/:id",
  celebrate(IncidentValidator.delete),
  IncidentController.delete
);

module.exports = routes;
