import mongoose from 'mongoose';


const contactSchema = new mongoose.Schema({
    name: {type: String, required: true }, 
    email: {type: String, required: true}, 
    phone: {type: String, required: true}, 
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, {timestamps: true})

export const contactModel = mongoose.models.Contact || mongoose.model('Contact', contactSchema)


