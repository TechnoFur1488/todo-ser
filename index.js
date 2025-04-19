import dotenv from "dotenv"
import express from "express"
import sequelize from "./db.js"
import router from "./routes/index.js"
import "./model/model.js"
import cors from "cors"

const PORT = process.env.PORT || 5000
const HOST = '0.0.0.0'

const app = express()

dotenv.config()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173", "https://todo-client-ojkva75bh-nikitas-projects-e30fe775.vercel.app"],
    methods: ["POST", "GET", "PUT", "DELETE"]
}))

app.use("/api", router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, HOST, () => console.log(`сервер работает на http://localhost:${PORT}`))
    } catch (e) {
        console.log(e);
    }
}

start()