import { pool } from '../db.js';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';
import  fs  from 'node:fs'


export const upload = multer({ dest: 'uploads/', encoding: 'utf-8' });



export const getFiles = async (req, res) => {
    
    const token = req.headers["x-access-token"]
    const decodedToken = jwt.verify(token, SECRET)
    const userId = decodedToken.id

    try {
        const [rows] = await pool.query('SELECT f.id, f.filename, f.description, f.isFolder, f.folderId, f.typeFile FROM files f JOIN permissions p ON p.fileId = f.id JOIN users u ON u.id = p.userId WHERE u.id = ?;', [userId])
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

// export const uploadFile = async(req, res) => {
//     const { filename,description, isFolder, folderId, typeFile, uploadedBy } = req.body;
    // const { filename } = req.file;
    // const typeFile = filename.split('.').pop();

//     try {
//         const {rows} = await pool.query('INSERT INTO files (filename, description, isFolder, folderId, typeFile, uploadedBy) VALUES (?, ?, ?, ?, ?, ?)', [filename, description, isFolder, folderId, typeFile, uploadedBy])
//         res.json({
//             message: 'Archivo subido exitosamente'
//           });
//     } catch (error) {
//         return res.status(500).json({
//             message: 'Something goes wrong'
//         })
//     }
//   }

export const uploadFile = async(req, res) => {
    console.log(req.file)
    saveFile(req.file)
    res.send('Finaliza')
}

async function saveFile(file) {
    const newPath = `./uploads/${file.originalname}`
    fs.renameSync(file.path, newPath)
    // try {
    //     const {rows} = await pool.query('')
    // } catch (error) {
    //     return res.status(500).json({
    //         message: 'Something goes wrong'
    //     })
    // }
    return newPath
}
