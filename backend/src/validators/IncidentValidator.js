const { Segments, Joi } = require("celebrate");

module.exports = {
  index: {
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  },

  create: {
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string()
        .min(5)
        .required(),
      description: Joi.string().required(),
      value: Joi.number()
        .positive()
        .required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  },

  delete: {
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }
};
