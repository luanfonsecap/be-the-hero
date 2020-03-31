const { Segments, Joi } = require("celebrate");

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required()
    })
  }
};
