import { Router } from "express";
// import { verifyToken } from "../middlewares/auth";
import { getFolders, getFolder, createFolder, deleteFolder } from "../controllers/folders.controller.js";

const router =  Router()

router.get('/folders', getFolders)
router.get('/folders/:code', getFolder)
router.post('/folders', createFolder)
router.delete('/folders/:code', deleteFolder)

export default router