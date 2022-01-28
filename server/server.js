import express from 'express'
import cors from 'cors'
import user from './routes/users.route.js'

const app = express()
app.use(cors())
app.use(express.json())
app.get("/api/users")
app.use("/api/v1/signUp",user)
app.use("*",(req,res)=>res.status(404).json({error:'not found'}))

app.listen()

export default app