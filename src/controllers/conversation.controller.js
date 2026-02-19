import Message from '../models/message.model.js';
import Conversation from '../models/conversations.model.js';

export const getMessagesByConversation = async (req, res)=>{
    try{
        const { conversationId } = req.params;
        //Find conversation
        const conversation = await Conversation.findById(conversationId);
        if(!conversation){
            return res.status(404).json({msg:'Conversation not found.'});
        }
        //Validate user is participant
        const isParticipant = conversation.participants.some(
            participant => participant.toString() === req.user._id.toString()
        );
        if(!isParticipant){
            return res.status(403).json({msg:'Not authorized.'});
        }
        //Obtain messages
        const messages = await Message.find({
            conversation: conversationId
        }).sort({createdAt: 1});
        res.json(messages);
    }catch(error){
        res.status(500).json({msg:'Server error'});
    }
};
export const getMyConversations = async (req, res)=>{
    try{
        const conversations = await Conversation.find({
            participants: req.user._id
        })
        .populate('participants', 'name email role')
        .populate({
            path: 'lastMessage',
            select: 'content sender createdAt read'
        })
        .sort({updatedAt: -1});
        res.json(conversations);
    }catch(error){
        gonsole.error(error);
        res.status(500).json({msg:'Server error'});
    }   
};