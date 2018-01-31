import Joi from 'joi-browser'

import configsSchema from './configs'
import formDataSchema from './formData'
import transactionSchema from './transaction'

export default Joi.object().keys({
  key: Joi.string().required(),
  configs: configsSchema,
  formData: formDataSchema,
  transaction: transactionSchema,
})

