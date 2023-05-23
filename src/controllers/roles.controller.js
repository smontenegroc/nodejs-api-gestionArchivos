import {pool} from '../db.js';

export const getRoles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM roles')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getRole = async (req, res) => {
    const {id} = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?', [id])
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createRole = async (req, res) => {
    const {roleName} = req.body

    try {
        const [existingRoles] = await pool.query('SELECT * FROM roles WHERE roleName = ?',[roleName]);
  
      if (existingRoles.length > 0) {
        return res.json('El rol ya está creado');
      }
        const [rows] = await pool.query('INSERT INTO roles (roleName) VALUES (?)', [roleName])
        res.send({
            id: rows.insertId,
            roleName
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const updateRole = async (req, res) => {

    const {id} = req.params

    try {
        const {roleName} = req.body

        const [result] = await pool.query('UPDATE roles SET roleName = ? WHERE id = ?', [roleName, id])

        if(result.affectedRows === 0) return res.status(404).json({
            message: 'User not found'
        })

        const [rows] = await pool.query('SELECT * FROM roles WHERE id = ?',[id])
    
        res.json(rows[0])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const deleteRole = async (req, res) => {
    const {id} = req.params

    try {
        
        const [result] = await pool.query('DELETE FROM role WHERE id = ?', [id])
        if(result.affectedRows <= 0) return res.status(404).json({
            message: 'User not found'
        })
    
        res.sendStatus(204)

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}