import { Message } from '../models/messageModel.js';
import { InteractionRequest } from '../models/interactionModel.js';
import { User } from '../models/userModel.js';

const resolveParticipants = async (currentUser, rawOtherUserId) => {
    const otherUserId = parseInt(rawOtherUserId);
    if (isNaN(otherUserId)) {
        return { error: { status: 400, message: 'Invalid user id supplied.' } };
    }

    const allowedRoles = ['student', 'alumni'];
    if (!allowedRoles.includes(currentUser.role)) {
        return { error: { status: 403, message: 'Only students and alumni can use messaging.' } };
    }

    const otherUser = await User.findById(otherUserId);
    if (!otherUser || !allowedRoles.includes(otherUser.role)) {
        return { error: { status: 404, message: 'The selected user cannot be messaged.' } };
    }

    if (currentUser.role === otherUser.role) {
        return { error: { status: 403, message: 'Messaging is only supported between students and alumni.' } };
    }

    if (currentUser.role === 'student') {
        return { participants: { studentId: currentUser.id, alumniId: otherUserId } };
    }

    return { participants: { studentId: otherUserId, alumniId: currentUser.id } };
};

// Get conversations for current user
export const getConversations = async (req, res, next) => {
    const userId = req.user.id;
    
    try {
        const conversations = await Message.getConversationsForUser(userId);
        res.json(conversations);
    } catch (error) {
        next(error);
    }
};

// Get conversation with specific user
export const getConversation = async (req, res, next) => {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    const { page = 1, limit = 50 } = req.query;
    const offset = (page - 1) * limit;
    
    try {
        const { participants, error } = await resolveParticipants(req.user, otherUserId);
        if (error) {
            return res.status(error.status).json({ message: error.message });
        }

        const connection = await InteractionRequest.checkExistingConnection(
            participants.studentId,
            participants.alumniId
        );
        if (!connection || connection.status !== 'accepted') {
            return res.status(403).json({ message: 'You are not connected with this user.' });
        }
        
        const otherId = parseInt(otherUserId);
        const messages = await Message.getConversation(userId, otherId, parseInt(limit), parseInt(offset));
        
        // Mark messages as read
        await Message.markConversationAsRead(userId, otherId);
        
        res.json(messages);
    } catch (error) {
        next(error);
    }
};

// Send message
export const sendMessage = async (req, res, next) => {
    const userId = req.user.id;
    const { receiverId, message } = req.body;
    
    try {
        const { participants, error } = await resolveParticipants(req.user, receiverId);
        if (error) {
            return res.status(error.status).json({ message: error.message });
        }

        const connection = await InteractionRequest.checkExistingConnection(
            participants.studentId,
            participants.alumniId
        );
        if (!connection || connection.status !== 'accepted') {
            return res.status(403).json({ message: 'You are not connected with this user.' });
        }
        
        const newMessage = await Message.create({
            sender_id: userId,
            receiver_id: parseInt(receiverId),
            message
        });
        
        res.status(201).json({ 
            message: 'Message sent successfully.',
            data: newMessage
        });
    } catch (error) {
        next(error);
    }
};

// Mark message as read
export const markAsRead = async (req, res, next) => {
    const { messageId } = req.params;
    
    try {
        const updatedMessage = await Message.markAsRead(messageId);
        if (!updatedMessage) {
            return res.status(404).json({ message: 'Message not found.' });
        }
        
        res.json({ 
            message: 'Message marked as read.',
            data: updatedMessage
        });
    } catch (error) {
        next(error);
    }
};

// Mark conversation as read
export const markConversationAsRead = async (req, res, next) => {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    
    try {
        const updatedMessages = await Message.markConversationAsRead(userId, parseInt(otherUserId));
        res.json({ 
            message: 'Conversation marked as read.',
            updatedCount: updatedMessages.length
        });
    } catch (error) {
        next(error);
    }
};

// Get unread message count
export const getUnreadCount = async (req, res, next) => {
    const userId = req.user.id;
    
    try {
        const unreadCount = await Message.getUnreadCount(userId);
        res.json({ unreadCount });
    } catch (error) {
        next(error);
    }
};

// Delete message
export const deleteMessage = async (req, res, next) => {
    const { messageId } = req.params;
    
    try {
        // Verify ownership of message
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({ message: 'Message not found.' });
        }
        
        if (message.sender_id !== req.user.id) {
            return res.status(403).json({ message: 'You can only delete your own messages.' });
        }
        
        await Message.delete(messageId);
        res.json({ message: 'Message deleted successfully.' });
    } catch (error) {
        next(error);
    }
};

// Delete entire conversation
export const deleteConversation = async (req, res, next) => {
    const userId = req.user.id;
    const { otherUserId } = req.params;
    
    try {
        await Message.deleteConversation(userId, parseInt(otherUserId));
        res.json({ message: 'Conversation deleted successfully.' });
    } catch (error) {
        next(error);
    }
};
