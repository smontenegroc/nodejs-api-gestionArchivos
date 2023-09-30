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
        const [rows] = await pool.query('SELECT * FROM files')
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
//     console.log(req.file)
//     console.log('-------------')
    // const respu = await saveFile(req.file, req.body)
    // console.log(req.body)
// }

// async function saveFile(file, info) {
    // const { description, isFolder, folderId } = info;
    
    // const filename = file.originalname;
    // const typeFile = file.mimetype;

    // const responseObject = {
    //     filename,
    //     description,
    //     isFolder,
    //     folderId,
    //     typeFile
    // };

    // const jsonResponse = JSON.stringify(info);

    // return jsonResponse;


    // const newPath = `./uploads/${filename}`
    // fs.renameSync(file.path, newPath)
    // try {
    //     const {rows} = await pool.query('INSERT INTO files (filename, description, isFolder, folderId, typeFile) VALUES (?, ?, ?, ?, ?, ?)', [filename, description, isFolder, folderId, typeFile, uploadedBy])
    // } catch (error) {
    //     return res.status(500).json({
    //         message: 'Something goes wrong'
    //     })
    // }
    // return newPath
// }
