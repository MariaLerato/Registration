import UserDao from "../dao/user.dao.js"
import User from "../models/userModel.js"
import asyncHandler from 'express-async-handler'
import BSON from "bson"
import jwt  from "jsonwebtoken"

const ObjectId = BSON.ObjectId
export default class UserController{
    static async apiPostUser(req,res,next){
        try{
            const {name,email,password,pic} = req.body
          
             const date = new Date()
            console.log(res.body)
            
            const userExists = await UserDao.login(
                email,
                password
            )
            if(userExists){
                res.status(400);
                throw new Error("User Already Exists")
            }
            const UserResponse = await UserDao.addUser(
            name,
            email,
            password,
            date,
            pic
            )
            if(UserResponse){
                res.status(201).json({
                    _id:UserResponse._id,
                    name:UserResponse.name,
                    password:UserResponse.password,
                    pic:UserResponse.pic
                })
                
            }else{
                res.status(400)
                throw new Error("Error Occured")
            }
     
         res.json({status:"Success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
   
    static async apiAuthUser(req,res,next){
        try{
            const {email,password} = req.body
            const user = await UserDao.match();
            // const users = await User.matchPassword(password)
            if(user ){
                res.json({
                    _id:user._id,
                    name:user.name,
                    password:user.password,
                    pic:user.pic
                })
            }else{
                res.status(400);
                throw new Error("Invalid email or password")
            }  
         res.json({status:"Success"})
        }catch(e){
            res.status(500).json({error:e.message})
        }
    }
   
}