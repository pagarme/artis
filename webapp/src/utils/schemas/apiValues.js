import Joi from 'joi-browser'

const formatDate = (date) => {
  const d = new Date(date)

  let month = `${(d.getMonth() + 1)}`
  let day = `${d.getDate()}`
  const year = `${d.getFullYear()}`

  if (month.length < 2) month = `0${month}`
  if (day.length < 2) day = `0${day}`

  return [year, month, day].join('-')
}

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const addressSchema = Joi.object()
  .keys({
    name: Joi.string(),
    street: Joi.string()
      .required(),
    number: Joi.number()
      .integer()
      .required(),
    complement: Joi.string(),
    neighborhood: Joi.string()
      .required(),
    city: Joi.string()
      .required(),
    state: Joi.string()
      .length(2)
      .required(),
    zipcode: Joi.string()
      .required(),
  })

const boletoSchema = Joi.object()
  .keys({
    subtitle: Joi.string(),
    instructions: Joi.string(),
    discountAmount: Joi.number()
      .integer()
      .min(0),
    discountPercentage: Joi.number()
      .integer()
      .min(0)
      .max(100),
    expirationAt: Joi.date()
      .min(formatDate(new Date().getTime())),
  })

const creditcardSchema = Joi.object()
  .keys({
    subtitle: Joi.string(),
    brands: Joi.array()
      .items(Joi.string())
      .unique(),
    maxInstallments: Joi.number()
      .integer()
      .min(1)
      .max(12),
    freeInstallment: Joi.number()
      .integer()
      .min(1)
      .max(12),
    defaultInstallment: Joi.number()
      .integer()
      .min(1)
      .max(12),
  })

const customerSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string()
      .email(),
    documentNumber: Joi.number()
      .integer(),
    phoneNumber: Joi.number()
      .integer(),
  })

const itemsSchema = Joi.object().keys({
  id: Joi.empty('').required(),
  title: Joi.string()
    .required(),
  unitPrice: Joi.number()
    .integer()
    .min(1)
    .required(),
  quantity: Joi.number()
    .integer()
    .min(1)
    .required(),
  tangible: Joi.boolean()
    .required(),
  category: Joi.string(),
  venue: Joi.string(),
  date: Joi.string()
    .regex(dateRegex, 'date'),
})

const apiValuesSchema = Joi.object()
  .keys({
    key: Joi.string()
      .required(),
    configs: Joi.object().keys({
      image: Joi.string(),
      target: Joi.string(),
      primaryColor: Joi.string()
        .hex(),
      secondaryColor: Joi.string()
        .hex(),
    }).required(),
    params: Joi.object().keys({
      amount: Joi.number()
        .integer()
        .min(1)
        .required(),
      softDescriptor: Joi.string(),
      paymentMethods: Joi.array()
        .items(Joi.string()),
      postbackUrl: Joi.string()
        .uri(),
      boleto: boletoSchema,
      creditcard: creditcardSchema,
      customer: customerSchema,
      items: Joi.array()
        .min(1)
        .items(itemsSchema)
        .required(),
      billing: addressSchema,
      shipping: Joi.alternatives(Joi.array()
        .items(addressSchema), addressSchema),
    }).required(),
  })

export default apiValuesSchema
