import { Router } from "express"
import { getFiles, getFile } from "../controllers/files.controller.js"

const router = Router()

router.get('/files', getFiles)
router.get('/files/:id', getFile)

export default router