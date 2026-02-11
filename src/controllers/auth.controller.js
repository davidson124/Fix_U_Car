//It handles the logic of authentication requests (registration, login, logout).
import User from '../models/User.model.js';
import { hashPassword, comparePassword } from '../utils/hashPassword.js';
import generateToken from '../utils/generateToken.js';


export const login = async (req, res) => {
    try{
        const { email, password } = req.body;
        //Basic validation
        if(!email || !password){
            return res.status(400).json({
                msg: 'Email and password are required'
            });
        }
        //Find user to email
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({
                msg: 'User not found'
            });
        }
        //Compare password
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                msg: 'Invalid password'
            });
        }
        const token = generateToken(user);
        res.status(200).json({
            msg:'Login successful',
            token,
            user:{
                id: user._id,
                name: user.name,
                role: user.role
            }
        });
        console.log(user);
    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};

export const register = async (req, res) => {
    try{
        const { name, email, password, cellphoneNumber } = req.body;
        if(!name || !email || !password || !cellphoneNumber ){
            return res.status(400).json({
                msg:'All fields are required'
            });
        }
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json({
                msg:'User already exists'
            });
        }
        const hashedPassword = await hashPassword(password);

        const user = new User ({
            name,
            email,
            password: hashedPassword,
            cellphoneNumber,
            role: 'USER'
        });
        await user.save();
        res.status(201).json({
            msg:'User registered successfully'
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            msg: 'Server error'
        });
    }
};



