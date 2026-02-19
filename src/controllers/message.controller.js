import Message from '../models/message.model.js';
import User from '../models/User.model.js';
import Conversation from '../models/conversations.model.js'
export const sendMessage = async (req,res)=>{
    try{
        const {content, receiverId}=req.body;
        if(!content){
            return res.status(400).json({msg:'Content is required'});
        }
        let receiver;
        //If user send message to admin
        if(req.user.role === "USER"){
            receiver = await User.findOne({role:"ADMIN"})
        }
        //If Admin -> Notify which user they are responding to
        if(req.user.role==='ADMIN'){
            receiver = await User.findById(receiverId);
        }
        if(!receiver){
            return res.status(404).json({msg:'Receiver no found'}) 
        }
        //Find existing conversation
        let conversation = await Conversation.findOne({
            participants: {$all: [req.user._id, receiver._id]}
        });
        //Conversation doesn't exist, so, make it.
        if(!conversation){
            conversation = new Conversation.create({
                participants: [req.user._id, receiver._id]
            });
        }
        // Create Message
        const message = await Message.create({
            content,
            sender: req.user._id,
            receiver: receiver._id,
            conversation: conversation._id
        });
        //Update last message
        conversation.lastMessage = message._id;
        await conversation.save();

        res.status(201).json({msg:'Message sent successfully'});

    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Server error'});
    }
};
export const getMyMessage=async(req, res)=>{
    try{
        const messages = await Message.find({receiver: req.user._id})
        .populate('sender','name role')
        .sort({createdAT:-1});
        res.json(messages)
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Server Error'});
    }
};
export const getAllMessages = async (req,res)=>{
    try{
        const messages = await Message.find()
            .populate('sender','name email role')
            .populate('receiver','name email role')
            .sort({createdAT: -1});
        res.json(messages);
    }catch(error){
        res.status(500).json({msg:'Server Error'});
    }
};
export const markAsRead = async (req, res)=>{
    try{
        const message = await Message.findById(req.params.id);
        if(!message){
            return res.status(404).json({msg:'Message not found'});
        }
        //Admin or receiver can mark message as a read
        const isReceiver = message.receiver.toString()===req.user._id.toString();
        const isAdmin = req.user.role === "ADMIN";
        if(!isReceiver && !isAdmin){
            return res.status(403).json({msg:'Not authorized.'});
        }
        message.read = true;
        await message.save();
        res.json({msg:'Message marked as read.'});
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Server error'});
    }
};
export const getUnreadCount = async (req, res) => {
    try{
        let filter ={};
        if(req.user.role === 'USER'){
            filter={
                receiver:req.user._id,
                read: false
            };
        }
        if(req.user.role === 'ADMIN'){
            filter={
                read:false
            };
        }
    const count = await Message.countDocuments(filter);
    res.json({ unread: count });
    }catch(error){
        console.error(error);
        res.status(500).json({msg:'Server error'});
    }
};
