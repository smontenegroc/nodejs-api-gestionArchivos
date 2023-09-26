import { Router } from 'express'
import { verifyToken, isAdmin } from '../middlewares/auth.js';
import { getGroups, getGroup } from '../controllers/groups.controller.js';

const router = Router()

router.get('/groups', [verifyToken, isAdmin], getGroups)
router.get('/groups/:groupname', [verifyToken, isAdmin], getGroup)

export default router


