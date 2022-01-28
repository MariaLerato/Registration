import app from './server.js'
import cors from 'cors'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import UserDao from './dao/user.dao.js'

dotenv.config()

const MongoClient = mongodb.MongoClient

const port = process.env.Port || 4000

MongoClient.connect(
    process.env.String,{
        maxPoolSize:50,
        wtimeoutMS:25,
        useNewUrlParser:true
    }
).catch(err=>{
    console.error(err.stack)
    process.exit(1)
})
.then(async client =>{
    
    await UserDao.injectDB(client)
    // console.log(client)
    app.listen(port,()=>{
        console.log(`Working On Port ${port}`)
    })
})

