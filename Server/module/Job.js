const mongoose = require('mongoose')

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, 'Please provide company name']
    },
    position: {
        type: String,
        required: [true, 'Please provide position']
    },
    status: {
        type: String, 
        enum: ['Interview', 'Declined', 'Pending'],
        default: 'Pending'     
    },
    createdBy: {
        type: mongoose.Types.ObjectId,      
        ref: 'Users',
        required: [true, 'Please provide user']   
    }   
}, {timestamps: true}) 

module.exports = mongoose.model('Jobs', JobSchema)