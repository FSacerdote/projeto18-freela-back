import { db } from "../database/database.connection.js";

export async function getUsers(cpf, email){
    return db.query(`SELECT * FROM users WHERE email=$1 OR cpf=$2`, [email, cpf])
}

export async function insertUser(nome, email, password, cpf, telefone, foto){
    return db.query(`
    INSERT INTO users (nome, email, password, cpf, telefone, foto) VALUES ($1, $2, $3, $4, $5, $6)`,
    [nome, email, password, cpf, telefone, foto]
    )
}

export async function getUsersByEmail (email){
    return await db.query(`SELECT * FROM users WHERE email=$1`, [email])
}

export async function insertSession(token, id){
    return await db.query(`INSERT INTO sessions (token, idusuario) VALUES ($1, $2)`, [token, id])
}