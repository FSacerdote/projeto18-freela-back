import { Router } from "express"
import gatosRouter from "./gatos.routes.js"
import authRouter from "./auth.routes.js"

const router = Router()
router.use(gatosRouter)
router.use(authRouter)

export default router