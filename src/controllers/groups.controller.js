import { pool } from '../db.js'

export const getGroups = async( req, res) => {
    try {
        const [groups] = await pool.query('SELECT * FROM groups')
        res.json(groups) 
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getGroup = async (req, res) => {
    try {
        const {groupname} = req.params
        const[group] = await pool.query('SELECT * FROM groups WHERE groupName = ?', [groupname])
        if(group.length <= 0 ) return res.status(404).json({
            message: 'Group not found'
        })
        res.json(group[0]) 
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
} 