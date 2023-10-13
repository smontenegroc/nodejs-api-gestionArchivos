import express  from "express";
import usersRoutes from "./routes/users.routes.js";
import filesRoutes from "./routes/files.routes.js";
import indexRoutes from "./routes/index.routes.js";
import rolesRoutes from './routes/roles.routes.js';
import authRoutes from './routes/auth.routes.js';
import groupsRoutes from './routes/groups.routes.js';
import foldersRoutes from './routes/folders.routes.js';

const app = express();

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type, x-access-token');
    next()
})

app.use(express.json())

app.use(indexRoutes)
app.use('/api', authRoutes)
app.use('/api', usersRoutes)
app.use('/api', filesRoutes)
app.use('/api', rolesRoutes)
app.use('/api', groupsRoutes)
app.use('/api', foldersRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;