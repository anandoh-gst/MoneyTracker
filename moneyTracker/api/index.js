import express      from 'express';
import cors         from 'cors';
import Transaction  from './models/transaction.js';
import mongoose     from 'mongoose';
import dotenv       from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000; // ASSEGNA PORTA DI PRODUZIONE, SE SVILUPPO PORTA:4000

app.use(cors());

app.use(express.json()); // Per TRASFORMA il body delle richieste in JSON

/* GET TEST MESSAGE */
app.get('/api/test', (req, res) => {

    res.json('Test! Hello, World! porta 4000');

});


/* GET ALL TRANSACTIONS */
app.get('/api/transactions', async (req, res) => {

    await mongoose.connect(process.env.MONGO_URL);

    const transactions = await Transaction.find();

    res.json(transactions);

})

/* SET NEW TRANSACTION */ 
app.post('/api/transaction', async (req, res) => {
    
    await mongoose.connect(process.env.MONGO_URL);

    const { name, price, datetime,description } = req.body;

    try {
        const transaction = await Transaction.create({ name, price, datetime, description });
        res.json(transaction);
    } 
    catch (error) {
        const errorMessage = 'Sorry, Failed to create transaction';
        res.status(500).json({ error: error.message + " " + errorMessage });
        console.error("🚀 :" + errorMessage);
    }

});


/* DELETE TRANSACTION */
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

/* LISTENER SERVER */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});