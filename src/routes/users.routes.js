import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser, deleteUser } from '../controllers/users.controller.js';
import { verifyToken, isAdmin } from '../middlewares/auth.js';

const router = Router()

router.get('/users', [verifyToken, isAdmin], getUsers)
router.get('/users/:username', [verifyToken, isAdmin], getUser)
router.post('/users', [verifyToken, isAdmin], createUser)
router.patch('/users/:id', [verifyToken, isAdmin] ,updateUser)
router.delete('/users/:id', [verifyToken, isAdmin] ,deleteUser)

export default router