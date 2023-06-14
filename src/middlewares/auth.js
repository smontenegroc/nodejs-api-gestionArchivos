import jwt from 'jsonwebtoken'
import { SECRET } from '../config.js'
import { pool } from '../db.js';

export const verifyToken = async (req, res, next) => {

    try {
        const token = req.headers["x-access-token"]
    
        if(!token) return res.status(403).json({message: "No token provided"})
    
        const decoded = jwt.verify(token, SECRET)
        const [existingUser] = await pool.query('SELECT id, username, password FROM users WHERE id = ?', [decoded.id]);
    
        if(existingUser < 0) return res.status(404).json({message: 'user not found'})
        
        next()
        
    } catch (error) {
        return res.status(401).json({message: 'Unauthorized'})
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, SECRET);
        const [existingUser] = await pool.query('SELECT roleId FROM users WHERE id = ?', [decoded.id]);

        if (existingUser < 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = existingUser[0].roleId;

        if (userRole !== 1) {
            return res.status(401).json({ message: 'Require Admin Role' });
        }

        next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}
export const isModerator = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        
        if (!token) {
            return res.status(403).json({ message: "No token provided" });
        }

        const decoded = jwt.verify(token, SECRET);
        const [existingUser] = await pool.query('SELECT roleId FROM users WHERE id = ?', [decoded.id]);

        if (existingUser < 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = existingUser[0].roleId;

        if (userRole !== 2) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // El usuario es un administrador, permitir el acceso
        next();

    } catch (error) {
        return res.status(401).json({ message: 'Require Admin Role' });
    }
}


