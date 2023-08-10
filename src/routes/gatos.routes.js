import { Router } from "express"

const gatosRouter = Router()

gatosRouter.post("/gatos")
gatosRouter.get("/gatos")
gatosRouter.get("/gatos/:id")
gatosRouter.get("/gatos/me")

export default gatosRouter