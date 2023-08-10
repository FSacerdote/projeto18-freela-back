import joi from "joi"

export const signUpSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    cpf: joi.string().length(11).regex(/^\d+$/).required(),
    telefone: joi.string().required(),
    foto: joi.string().uri().required()
})