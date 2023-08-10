import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res) {
    const { nome, email, password, cpf, telefone, foto } = req.body
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1 OR cpf=$2`, [email, cpf])
        if (user.rowCount !== 0) return res.sendStatus(409)
        await db.query(`
            INSERT INTO users (nome, email, password, cpf, telefone, foto) VALUES ($1, $2, $3, $4, $5, $6)`,
            [nome, email, bcrypt.hashSync(password, 10), cpf, telefone, foto]
        )
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signin(req, res) {
    const { email, password } = req.body
    try {
        const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email])
        if (user.rowCount === 0) return res.sendStatus(404)
        if (!bcrypt.compareSync(password, user.rows[0].password)) return res.sendStatus(401)
        const token = uuid()
        await db.query(`INSERT INTO sessions (token, idusuario) VALUES ($1, $2)`, [token, user.rows[0].id])
        res.send({token})
    } catch (error) {
        res.status(500).send(error.message)
    }
}