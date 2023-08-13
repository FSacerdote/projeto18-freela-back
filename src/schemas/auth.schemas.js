import joi from "joi"

export const signUpSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
    cpf: joi.string().length(14).required(),
    telefone: joi.string().length(15).required(),
    foto: joi.string().uri().required()
})

export const signInSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().min(3).required(),
})