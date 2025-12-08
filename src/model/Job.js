import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    position: { type: String, required: true },
    
    // Detailed Status Tracking
    isApplied: { type: String, default: 'Not Started', enum: ['Done', 'Not Started', 'In Progress'] },

    isCalled: { type: String, default: 'Not', enum: ['Yes', 'Not', 'Missed'] },
    isMailed: { type: String, default: 'Not', enum: ['Done', 'Not', 'Pending'] },
    response: { type: String, default: 'Pending', enum: ['Pending', 'Rejected', 'Interview', 'Offer'] },
    priority: { type: String, default: 'Medium', enum: ['High', 'Medium', 'Low'] },
    
    // Application Method
    applicationMethod: { type: String, default: 'Easy Apply', enum: ['Easy Apply', 'Website', 'Email', 'Referral', 'Recruiter', 'WhatsApp', 'Other'] },

    // Contact Info
    phone: { type: String },
    email: { type: String },
    appliedLink: { type: String },
    applicationDate: { type: Date, default: Date.now },
    
    // Legacy support (optional, can be deprecated)
    status: { type: String }, 

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true });

// Prevent Mongoose OverwriteModelError in development
// and ensure schema updates are applied by deleting the model if it exists
if (process.env.NODE_ENV === 'development' && mongoose.models.Job) {
  delete mongoose.models.Job;
}

export const jobModel = mongoose.models.Job || mongoose.model('Job', jobSchema);
