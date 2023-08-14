import { Router } from "express"
import validateAuth from "../middlewares/validateAuth.js"
import { changeStatus, deleteGato, editGato, getGatos, getGatosById, getMyGatos, postGato } from "../controllers/gatos.controllers.js"
import validateSchema from "../middlewares/vavlidateSchema.js"
import { gatoSchema } from "../schemas/gatos.schemas.js"

const gatosRouter = Router()

gatosRouter.post("/gatos", validateSchema(gatoSchema), validateAuth, postGato)
gatosRouter.get("/gatos", validateAuth, getGatos)
gatosRouter.get("/gatos/:id", validateAuth, getGatosById)
gatosRouter.get("/me/gatos", validateAuth, getMyGatos)
gatosRouter.patch("/gatos/:id", validateAuth, changeStatus)
gatosRouter.put("/gatos/:id", validateSchema(gatoSchema), validateAuth, editGato)
gatosRouter.delete("/gatos/:id", validateAuth, deleteGato)

export default gatosRouter