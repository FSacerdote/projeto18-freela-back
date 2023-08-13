import { db } from "../database/database.connection.js"

export async function getGatos(req, res) {
    try {
        const gatos = await db.query(`SELECT * FROM gatos;`)
        res.send(gatos.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getGatosById(req, res) {
    const { id } = req.params
    try {
        const gato = await db.query(`SELECT * FROM gatos WHERE id=$1`, [id])
        if (gato.rowCount === 0) return res.sendStatus(404)
        res.send(gato)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getMyGatos(req, res) {
    const { userId } = res.locals
    try {
        const gatos = await db.query(`SELECT * FROM gatos WHERE idtutor=$1;`, [userId])
        res.send(gatos)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postGato(req, res) {
    const { userId } = res.locals
    const { nome, idade, genero, fotoperfil } = req.body
    try {
        await db.query(`INSERT INTO gatos (nome, idade, genero, idtutor, fotoperfil) VALUES ($1, $2, $3, $4, $5)`, [nome, idade, genero, userId, fotoperfil])
        res.send()
    } catch (error) {
        res.status(500).send(error.message)
    }
}