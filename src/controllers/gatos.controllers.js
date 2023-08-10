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
        if(gato.rowCount === 0) return res.sendStatus(404)
        res.send(gato)
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getMyGatos(req, res) {

}

export async function postGato(req, res) {

}