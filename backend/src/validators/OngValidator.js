const { Segments, Joi } = require("celebrate");

module.exports = {
  create: {
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number()
        .min(10)
        .max(11)
        .regex(/^[^a-zA-Z]+$/)
        .required(),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }
};
