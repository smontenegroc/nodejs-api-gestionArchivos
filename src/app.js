import express  from "express";
import usersRoutes from "./routes/users.routes.js";
import filesRoutes from "./routes/files.routes.js";
import indexRoutes from "./routes/index.routes.js";
import rolesRoutes from './routes/roles.routes.js'

const app = express();

app.use(express.json())

app.use(indexRoutes)
app.use('/api',usersRoutes)
app.use('/api',filesRoutes)
app.use('/api',rolesRoutes)
app.use((req, res, next) => {
    res.status(404).json({
        message: 'endpoint not found'
    })
})

export default app;