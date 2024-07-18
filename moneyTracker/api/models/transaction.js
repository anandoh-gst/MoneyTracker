import mongoose, { Schema } from 'mongoose';


const TransactionSchema = new Schema({
    name:           {type: String, required: true},
    price:          {type: Number, required: true},
    datetime:       {type: Date,   required: true},
    description:    {type: String, required: true}
});


const TransactionModel = mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;