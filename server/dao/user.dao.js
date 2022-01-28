import mongodb from 'mongodb'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const ObjectId = mongodb.ObjectId
let user

export default class UserDao{
    static async injectDB(conn){
        if(user){
            return
        }
        try{
            user = await conn.db(process.env.Database).collection("users")
        }
        catch(e){
            console.log(`Unable to establish collection handles in userDao: ${e}`)
        }
    }
    static async addUser(name,email,password,date,pic){
        try{
            const userDoc = {
                name:name,
                email:email,
                password:password,
                date:date,
                pic:pic
            }
            console.log(userDoc)
            return await user.insertOne(userDoc)
        }
        catch(e){
            console.error(`Unable to post user:${e}`)
        }
    }
    static async login(email,password){
       try{
           const userExists = {
               email:email,
               password:password
           }
           console.log(userExists)
           return await user.findOne(userExists)
       }
       catch(e){
           console.error(`User Does Not Exist`)
       }
    } 
    // static async encypt(next,password){
    //     user.pre("save")
    //      if(isModified("password")){
    //          next()
    //      }
    //      const salt =  await bcrypt.genSalt(10);
    //      password =  await bcrypt.hash(password, salt)        
    // }
    static async match(enteredPasword){
        // return await bcrypt.compare(enteredPassword,this.password)
        try{
            
          const user = await bcrypt.compare(enteredPasword,this.password)
          return await user.findOne({email})
        }catch(e){
            console.error(e.message)
        }
    }
}
