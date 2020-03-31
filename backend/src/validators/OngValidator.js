const { Segments, Joi } = require("celebrate");

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.string()
        .min(10)
        .max(11)
        .regex(new RegExp(/^[^a-zA-Z]$/))
        .required(),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }
};
