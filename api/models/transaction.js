import mongoose, { Schema } from 'mongoose';


const TransactionSchema = new Schema({
    name:           {type: String, required: true},
    price:          {type: Number, required: true},
    datetime:       {type: Date,   required: true},
    description:    {type: String, required: true},
    role:           {type: String, enum: ["user", "admin"], default: "user"}
});


const TransactionModel = mongoose.model('Transaction', TransactionSchema, 'personal_transactions');

export default TransactionModel;