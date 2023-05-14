import { pool } from "../db.js"


export const getUsers = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM users')
        res.json(rows)        
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const {id} = req.params
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id])
        if(rows.length <= 0 ) return res.status(404).json({
            message: 'User not found'
        })
        res.json(rows[0])        
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createUser = async (req, res) => {

    try {
        const {fullname, username, password} = req.body
        const [rows] = await pool.query('INSERT INTO users (fullname, username, password) VALUES (?, ?, ?)', [fullname, username, password])
        res.send({
            id: rows.insertId,
            fullname,
            username,
         })        
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const updateUser = async (req, res) => {

    try {
        const {id} = req.params
        const {fullname, username,password} = req.body
    
        const [result] = await pool.query('UPDATE users SET fullname = IFNULL(?, fullname), username = IFNULL(?, username), password = IFNULL(?, password) WHERE id = ?', [fullname,username,password,id])
    
        if(result.affectedRows === 0) return res.status(404).json({
            message: 'User not found'
        })
    
        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?',[id])
    
        res.json(rows[0])        
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }

}

export const deleteUser = async (req, res) => {
    try {
        const {id} = req.params
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id])
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