import Joi from 'joi-browser'

const apiValuesSchema = Joi.object().keys({
  key: Joi.string().required(),
  configs: Joi.object().keys({
    image: Joi.string(),
    locale: Joi.string(),
    theme: Joi.string(),
  }).required(),
  params: Joi.object().keys({
    amount: Joi.number().required(),
    paymentMethod: Joi.string().required(),
  }).required(),
})

export default apiValuesSchema
