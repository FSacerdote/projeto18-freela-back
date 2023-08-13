import { Router } from "express"
import validateAuth from "../middlewares/validateAuth.js"
import { changeStatus, getGatos, getGatosById, getMyGatos, postGato } from "../controllers/gatos.controllers.js"

const gatosRouter = Router()

gatosRouter.post("/gatos", validateAuth, postGato)
gatosRouter.get("/gatos", validateAuth, getGatos)
gatosRouter.get("/gatos/:id", validateAuth, getGatosById)
gatosRouter.get("/me/gatos", validateAuth, getMyGatos)
gatosRouter.patch("/gatos/:id", validateAuth, changeStatus)

export default gatosRouter