import Joi from 'joi-browser'

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const customerSchema = Joi.object().keys({
  name: Joi.string(),
  email: Joi.string().email(),
  documentNumber: Joi.number().integer(),
  phoneNumber: Joi.number().integer(),
})

const addressSchema = Joi.object().keys({
  name: Joi.string(),
  street: Joi.string().required(),
  number: Joi.number().integer().required(),
  complement: Joi.string(),
  neighborhood: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().length(2).required(),
  zipcode: Joi.string().required(),
})

const itemsSchema = Joi.object().keys({
  id: Joi.empty(''),
  description: Joi.string().required(),
  amount: Joi.number().integer().min(1),
  quantity: Joi.number().integer().min(1),
  tangible: Joi.boolean(),
  category: Joi.string(),
  venue: Joi.string(),
  date: Joi.string().regex(dateRegex, 'date'),
})

export default Joi.object().keys({
  customer: customerSchema,
  billing: addressSchema,
  shipping: addressSchema,
  items: Joi.array().min(1).items(itemsSchema).required(),
})
