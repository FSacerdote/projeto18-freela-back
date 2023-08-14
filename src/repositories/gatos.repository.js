import { db } from "../database/database.connection.js";

export async function getActiveCats() {
    return db.query(`SELECT * FROM gatos WHERE disponibilidade=true ORDER BY id;`)
}

export async function getCatById(id) {
    return db.query(`SELECT gatos.*, users.telefone, users.email, users.nome AS nometutor FROM gatos JOIN users ON gatos.idtutor=users.id WHERE gatos.id=$1`, [id])
}

export async function getMyCats(userId) {
    return db.query(`SELECT * FROM gatos WHERE idtutor=$1 ORDER BY id;`, [userId])
}

export async function insertGato(nome, idade, genero, userId, fotoperfil) {
    db.query(`INSERT INTO gatos (nome, idade, genero, idtutor, fotoperfil) VALUES ($1, $2, $3, $4, $5)`, [nome, idade, genero, userId, fotoperfil])
}

export async function searchCat(id) {
    return db.query(`SELECT * FROM gatos WHERE id=$1;`, [id])
}

export async function updateStatus(disponibilidade, id) {
    return db.query(`UPDATE gatos SET disponibilidade=$1 WHERE id=$2;`, [!disponibilidade, id])
}

export async function editCat(nome, idade, genero, fotoperfil, id) {
    return db.query(`UPDATE gatos SET nome=$1, idade=$2, genero=$3, fotoperfil=$4 WHERE id=$5;`, [nome, idade, genero, fotoperfil, id])
}

export async function deleteCat(id){
    return db.query(`DELETE FROM gatos WHERE id=$1;`, [id])
}