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
    const {code} = req.params
    try {
        const [rows] = await pool.query('SELECT * FROM files WHERE code = ?', [code])
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

export const uploadFile = async(req, res) => {
    
    const {description, isFolder, uploadedBy} = req.body
    const {originalname, mimetype, path} = req.file
    const code = createFileCode()

    const folderId = req.body.folderId ? req.body.folderId: null

    const newPath = `./uploads/${originalname}`
    fs.renameSync(path, newPath)

    try {
        const row = pool.query('INSERT INTO files (filename, code, description, isFolder, folderId, typeFile, uploadedBy) VALUES (?, ?, ?, ?, ?, ?, ?)', [originalname, code, description, isFolder, folderId, mimetype, uploadedBy])

        if(row){
            res.send({
                message: 'Archivo subido'
            })            
        }
        else{
            res.send({
                message: 'Error al subir el archivo'
            })  
        }

    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ message: 'Ya existe un archivo con el mismo nombre.' });
        }      
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    } 
}

export const downloadFile = async (req, res) => {
    const code = req.params.code
    const response = await getFileByCode(code)
    const filename = response.filename

    if (!filename) {
        return res.status(404).json({
            message: 'Archivo no encontrado'
        });
    }

    const routeFile = `./uploads/${filename}`

    res.download(routeFile, (err) => {
        if(err) {
            res.status(404).send({message: 'Archivo no encontrado'})
        }
    })
}

function createFileCode () {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    
    for(let i = 0; i < 20; i++){
        const indexRamdon = Math.floor(Math.random() * characters.length)
        code += characters.charAt(indexRamdon)
    }
    return code
}

async function getFileByCode(code) {
    try {
        const [rows] = await pool.query('SELECT filename FROM files WHERE code = ?', [code]);

        if (rows.length <= 0) {
            return { filename: null };
        }

        return { filename: rows[0].filename };
    } catch (error) {
        console.error(error);
        throw new Error('Error en el proceso');
    }
}


