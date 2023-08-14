import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"
import { getUsers, getUsersByEmail, insertSession, insertUser } from "../repositories/auth.repository.js"

export async function signup(req, res) {
    const { nome, email, password, cpf, telefone } = req.body
    try {
        const user = await getUsers(cpf, email)
        if (user.rowCount !== 0) return res.sendStatus(409)
        await insertUser(nome, email, bcrypt.hashSync(password, 10), cpf, telefone)
        res.sendStatus(201)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function signin(req, res) {
    const { email, password } = req.body
    try {
        const user = await getUsersByEmail(email)
        if (user.rowCount === 0) return res.sendStatus(404)
        if (!bcrypt.compareSync(password, user.rows[0].password)) return res.sendStatus(401)
        const token = uuid()
        await insertSession(token, user.rows[0].id)
        res.send({token})
    } catch (error) {
        res.status(500).send(error.message)
    }
}