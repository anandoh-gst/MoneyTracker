import mongoose from 'mongoose';

export default async function connectionDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL, { 
            dbName: 'general_budget', // NOME DB
        });
        console.log('Connected to the database successfully');
    } catch (error) {
        console.error('Failed to connect to the database', error);
    }
}
