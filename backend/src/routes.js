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

const authMiddleware = require("./middlewares/auth");

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
  authMiddleware,
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
  authMiddleware,
  celebrate(IncidentValidator.create),
  IncidentController.create
);

routes.delete(
  "/incidents/:id",
  authMiddleware,
  celebrate(IncidentValidator.delete),
  IncidentController.delete
);

routes.put(
  "/incidents/:id",
  authMiddleware,
  celebrate(IncidentValidator.update),
  IncidentController.update
);

module.exports = routes;
