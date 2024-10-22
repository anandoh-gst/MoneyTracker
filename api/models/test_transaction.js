import mongoose, { Schema } from 'mongoose';


const TestTransactionSchema = new Schema({
    name:           {type: String, required: true},
    price:          {type: Number, required: true},
    datetime:       {type: Date,   required: true},
    description:    {type: String, required: true},
    role:           {type: String, enum: ["user", "admin"], default: "admin"}
});


const TestTransactionModel = mongoose.model('Test_transaction', TestTransactionSchema, 'test_user_transactions');

export default TestTransactionModel;