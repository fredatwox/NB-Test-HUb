import Joi from "joi";



export const registerUserValidator = Joi.object({
    fullname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.ref('password'),
}).with('password', 'confirmPassword')



export const loginUserValidator = Joi.object({
    fullname: Joi.string().optional(),
    email: Joi.string().optional(),
    password: Joi.string().required(),

});


