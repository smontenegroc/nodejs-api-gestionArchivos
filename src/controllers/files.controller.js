import { pool } from '../db.js';
import multer from 'multer';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

export  const upload = multer({ storage });



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

export const uploadFile = async(req, res) => {
    const { description } = req.body;
    const { filename } = req.file;
    const typeFile = filename.split('.').pop();

    try {
        const {rows} = await pool.query('INSERT INTO files (filename, description, isFolder, typeFile) VALUES (?, ?, 1, ?)', [filename, description, typeFile])
        res.send({
            id: rows.insertId,
            filename
          });
    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
  
    const message = 'Archivo subido exitosamente';
  
    res.json({ message });
  }


  export const createFolder = async (req, res) => {
    const { filename, description, folderId } = req.body

    try {
        const {rows} = await pool.query('INSERT INTO files (filename, description, isFolder, folderId, typeFile) VALUES (?, ?, 0,?, folder)', [filename, description, folderId, typeFile])

    } catch (error) {
        return res.status(500).json({
            message: 'Something goes wrong'
        })
    }
  }
  

