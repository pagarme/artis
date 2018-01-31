import Joi from 'joi-browser'

export default Joi.object().keys({
  companyName: Joi.string(),
  image: Joi.string(),
  target: Joi.string(),
  primaryColor: Joi.string().hex(),
  secondaryColor: Joi.string().hex(),
  postback: Joi.string().uri(),
  onSuccess: Joi.func(),
  onError: Joi.func(),
  onClose: Joi.func(),
})

