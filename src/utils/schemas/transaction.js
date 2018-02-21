import Joi from 'joi-browser'

const boletoSchema = Joi.object().keys({
  subtitle: Joi.string(),
  instructions: Joi.string(),
  expirationAt: Joi.date(),
  discount: Joi.object().keys({
    type: Joi.string().valid('percentage', 'amount').required(),
    value: Joi.number().when('type', {
      is: 'percentage',
      then: Joi.number().min(1).max(100),
    }).required(),
  }),
})

const installmentsRule = Joi.number().integer().min(1).max(12)

const creditcardSchema = Joi.object().keys({
  subtitle: Joi.string(),
  maxInstallments: installmentsRule,
  freeInstallments: installmentsRule,
  defaultInstallments: installmentsRule,
  statementDescriptor: Joi.string().max(22),
  brands: Joi.array().items(
    Joi.string()
  ).unique(),
  interestRate: Joi.any().when('freeInstallments', {
    is: Joi.exist(),
    then: Joi.number().min(0).max(100).required(),
    otherwise: Joi.number().min(0).max(100),
  }),
})

export default Joi.object().keys({
  amount: Joi.number().integer().min(1).required(),
  paymentMethods: Joi.array().items(),
  boleto: boletoSchema,
  creditcard: creditcardSchema,
}).required()
