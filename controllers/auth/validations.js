const Joi=require("joi");

const Schema = Joi.object({
  userName:Joi.string().min(5).required(),  
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

module.exports= Schema;
