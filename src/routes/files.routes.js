import { Router } from "express"
import { getFiles, getFile, uploadFile } from "../controllers/files.controller.js"
import { verifyToken } from '../middlewares/auth.js';
import { upload } from "../controllers/files.controller.js";

const router = Router()

router.get('/files', verifyToken ,getFiles)
router.get('/files/:code', getFile)
// router.post('/files', verifyToken , upload.single('file'), uploadFile)
// router.post('/files', upload.single('file'), uploadFile)
router.post('/files', upload.single('file'), uploadFile)

export default router