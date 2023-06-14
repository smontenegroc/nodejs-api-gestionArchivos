import { pool } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';

export const signIn = async (req, res) => {

    const {username, password} = req.body

    const [existingUser] = await pool.query('SELECT id, username, password, roleId FROM users WHERE username = ?', [username]);

    if (existingUser.length > 0) {
        const dbpassword = existingUser[0].password;
        const userId = existingUser[0].id;
        const roleId = existingUser[0].roleId;
  
        // Comparar la contraseña enviada con la almacenada
        const passwordMatch = await bcrypt.compare(password, dbpassword);

        if (passwordMatch) {
            // La contraseña coincide
            const token = jwt.sign({id: userId}, SECRET, {expiresIn: 86400})
            return res.json({status: "ok", token, roleId});
        } else {
            // La contraseña no coincide
            return res.json({status: "error", message: 'La contraseña no coincide'});
        }
    } else {
        return res.json({status: "error", message: 'El usuario NO existe'});
    }
}