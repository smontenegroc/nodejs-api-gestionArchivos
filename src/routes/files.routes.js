import { Router } from "express"
import { getFiles, getFile, uploadFile, upload } from "../controllers/files.controller.js"
import { verifyToken } from '../middlewares/auth.js';

const router = Router()

router.get('/files', getFiles)
router.get('/files/:id', getFile)
// router.post('/files', verifyToken , upload.single('file'), uploadFile)
router.post('/files', uploadFile)

export default router