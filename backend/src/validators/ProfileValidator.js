const { Segments, Joi } = require("celebrate");

module.exports = {
  index: {
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }
};
