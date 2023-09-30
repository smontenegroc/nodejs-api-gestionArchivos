import { Router } from "express"
import { getFiles, getFile } from "../controllers/files.controller.js"
import { verifyToken } from '../middlewares/auth.js';

const router = Router()

router.get('/files', verifyToken ,getFiles)
router.get('/files/:id', getFile)
// router.post('/files', verifyToken , upload.single('file'), uploadFile)
// router.post('/files', upload.single('file'), uploadFile)

export default router