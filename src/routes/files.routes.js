import { Router } from "express"
import { getFiles, getFile, uploadFile, upload } from "../controllers/files.controller.js"

const router = Router()

router.get('/files', getFiles)
router.get('/files/:id', getFile)
router.post('/files', upload.single('file'), uploadFile)

export default router