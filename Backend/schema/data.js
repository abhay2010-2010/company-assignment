const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema
const recordSchema = new Schema({
    
    quantity: { type: Number, required: true },
    amount: { type: Number, required: true },
    postingYear: { type: Number, required: true },
    postingMonth: { type: String, required: true },
    actionType: { type: String, required: true },
    actionNumber: { type: String, required: true },
    actionName: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Approved'], required: true },
    impact: { type: String, enum: ['Low', 'Mid', 'High'], required: true }
});


const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
