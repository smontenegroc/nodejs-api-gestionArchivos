import { pool } from "../db.js";
// import jwt from "jsonwebtoken";
// import { SECRET } from '../config.js';

export const getFolders = async (req, res) => {
    // const token = req.headers["x-access-token"]
    // const decodedToken = jwt.verify(token, SECRET)
    // const userId = decodedToken.id

    try {
        const [rows] = await pool.query('SELECT * FROM files WHERE isFolder = 1')
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const getFolder = async (req, res) => {
    const { code } = req.params

    try {
        const [rows] = await pool.query('SELECT * FROM files WHERE code = ?', [code])
        if(rows <= 0)return res.status(404).json({
            message: 'Folder not found'
        })
        res.json(rows[0])
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
}

export const createFolder = async (req, res) => {
    const {filename, description, uploadedBy} = req.body
    const folderId = req.body.folderId ? req.body.folderId: null
    const code = createFolderCode()
    
    try {
        const [row] = await pool.query('INSERT INTO files (filename, code, description, isFolder, folderId, typeFile, uploadedBy) VALUES (?, ?, ?, 1, ?, "folder", ?)', [filename, code, description, folderId, uploadedBy])

        if(row){
            res.send({
                message: 'Carpeta creada'
            })            
        }
        else{
            res.send({
                message: 'Error al crear la carpeta'
            })  
        }
    } catch (error) {
        
    }
}

export const deleteFolder = async (req, res) => {
    const { code } = req.params
    try {
        const [row] = await pool.query('DELETE FROM files WHERE code = ?', [code])
        if(row){
            res.json({message: "Folder deleted"})
        }
        else{
            res.send({
                message: 'Error al crear la carpeta'
            }) 
        }
    } catch (error) {
        
    }
}


function createFolderCode () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    
    for(let i = 0; i < 20; i++){
        const indexRamdon = Math.floor(Math.random() * characters.length)
        code += characters.charAt(indexRamdon)
    }
    return code
}