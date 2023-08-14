import joi from "joi"

export const gatoSchema = joi.object({
    nome: joi.string().required(),
    idade: joi.number().integer().required(),
    genero: joi.string().valid("Macho", "Fêmea").required(),
    fotoPerfil: joi.string().uri().required()
})