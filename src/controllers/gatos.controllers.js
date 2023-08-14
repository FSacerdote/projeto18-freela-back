import { db } from "../database/database.connection.js"
import { getActiveCats, getCatById, getMyCats, insertGato, searchCat, updateStatus } from "../repositories/gatos.repository.js"

export async function getGatos(req, res) {
    try {
        const gatos = await getActiveCats()
        res.send(gatos.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getGatosById(req, res) {
    const { id } = req.params
    try {
        const gato = await getCatById(id)
        if (gato.rowCount === 0) return res.sendStatus(404)
        res.send(gato.rows[0])
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getMyGatos(req, res) {
    const { userId } = res.locals
    try {
        const gatos = await getMyCats(userId)
        res.send(gatos.rows)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postGato(req, res) {
    const { userId } = res.locals
    const { nome, idade, genero, fotoperfil } = req.body
    try {
        await insertGato(nome, idade, genero, userId, fotoperfil)
        res.send()
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function changeStatus(req, res) {
    const { id } = req.params
    const { userId } = res.locals
    try {
        const gato = await searchCat(id)
        if (gato.rowCount === 0) return res.sendStatus(404)
        if (userId !== gato.rows[0].idtutor) return res.sendStatus(401)
        const { disponibilidade } = gato.rows[0]
        await updateStatus(disponibilidade, id)
        res.send()
    } catch (error) {
        res.status(500).send(error.message)
    }
}