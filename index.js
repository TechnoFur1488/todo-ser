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
    origin: [
        "https://todo-client-gbib8qxd1-nikitas-projects-e30fe775.vercel.app", 
        "https://todo-client-delta-eight.vercel.app",
        "https://todo-client-nikitas-projects-e30fe775.vercel.app"
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
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
