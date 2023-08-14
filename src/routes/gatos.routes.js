import { Router } from "express"
import validateAuth from "../middlewares/validateAuth.js"
import { changeStatus, deleteGato, editGato, getGatos, getGatosById, getMyGatos, postGato } from "../controllers/gatos.controllers.js"

const gatosRouter = Router()

gatosRouter.post("/gatos", validateAuth, postGato)
gatosRouter.get("/gatos", validateAuth, getGatos)
gatosRouter.get("/gatos/:id", validateAuth, getGatosById)
gatosRouter.get("/me/gatos", validateAuth, getMyGatos)
gatosRouter.patch("/gatos/:id", validateAuth, changeStatus)
gatosRouter.put("/gatos/:id",validateAuth, editGato)
gatosRouter.delete("/gatos/:id", validateAuth, deleteGato)

export default gatosRouter