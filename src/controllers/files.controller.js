import { pool } from '../db.js';

export const getFiles = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM files')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getFile = async (req, res) => {
    const {id} = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM files WHERE id = ?', [id])
        if(rows <= 0)return res.status(404).json({
            message: 'File not found'
        })

        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}