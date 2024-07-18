import express      from 'express';
import cors         from 'cors';
import Transaction  from './models/transaction.js';
import mongoose     from 'mongoose';
import dotenv       from 'dotenv';

dotenv.config();
const app = express();

app.use(cors());

app.use(express.json()); // Per parsare il body delle richieste come JSON

app.get('/api/test', (req, res) => {

    res.json('Test! Hello, World! porta 4000');

});

app.post('/api/transaction', async (req, res) => {
    
    await mongoose.connect(process.env.MONGO_URL);

    const { name, price, datetime,description } = req.body;

    try {
        const transaction = await Transaction.create({ name, price, datetime, description });
        res.json(transaction);
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to create transaction' });
    }

});

app.get('/api/transactions', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);

    const transactions = await Transaction.find();

    res.json(transactions);

})

app.delete('/api/transaction/:id', async (req, res) => {

    const { id } = req.params;

    try {

        const transaction = await Transaction.findByIdAndDelete(id);
        if (!transaction) {
        return res.status(404).json({ error: 'Transaction not found' });
        }
        res.json({ message: "Let's go! Transaction deleted successfully" });

    } catch (error) {

        res.status(500).json({ error: 'Failed to delete transaction' });

    }
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});