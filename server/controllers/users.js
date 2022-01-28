import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const signin = async (req,res) => {
    const {email,password} = req.body;
    try{
        const existing = await User.findOne({email})
        if(!existing) return res.status(404).json({message:"User does not exist"})
        const isPassword = await bcrypt.compare(password,existing.password)
        if(!isPassword) return res.status(400).json({message:"Invalid credientails"})
        const token = jwt.sign({email:existing.email,id:existing._id},'test',{expiresIn:"1h"})
         res.status(200).json({result:existing,token})
    }catch(error){
        res.status(500).json({message:'Something Went Wrong'})
    }
}

export const signUp = async (req,res)=>{
    const {email,password,confirmPassword,name} = req.body
    try{
        const existing = await User.findOne({email});
        if(existing) return res.status(400).json({message:"User doesnt exist"})
        if(password !== confirmPassword) return res.status(400).json({message:"Password does not match"})
        const hashedPassword = await bcrypt.hash(password,12)
        const results = await User.create({email,password:hashedPassword,name:`${name}`})
        const token = jwt.sign({email:results.email,id:results._id},'test',{expiresIn:"1h"})
        res.status(200).json({results,token})
    } catch(error){
        res.status(500).json({message:'Something Went Wrong'})
    }
}