import User from '../models/User.model.js';
import { hashPassword } from '../utils/hashPassword.js';
export const createWorker = async (req, res)=>{
    try{
        const { name, email, password, cellphoneNumber } = req.body;
        if(!name || !email || !password || !cellphoneNumber){
            return res.status(400).json({msg:'All fields are required'});
        }
        //verifi user exist with email
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({msg: 'User already exists'});
        }
        //Hash password
        const hashedPassword = await hashPassword(password);
        //Create worker
        const worker = new User({
            name,
            email,
            password: hashedPassword,
            cellphoneNumber,
            role: 'WORKER'
        });
        await worker.save();
        res.status(201).json({msg:'Worker created successfully',
            worker:{
                id: worker._id,
                name: worker.name,
                email: worker.email,
                role: worker.role
            }
        });   
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Server error'});
    }
};