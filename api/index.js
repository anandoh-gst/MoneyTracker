import express              from 'express';
import cors                 from 'cors';
import dotenv               from 'dotenv';
import connectionDb         from './config/connectionDb.js';
import transactionRoutes    from './routes/transactionRoutes.js';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;                  // ASSEGNA PORTA DI PRODUZIONE, SE SVILUPPO PORTA:4000

// *Tutte le rotte accettate da tutti i client!
app.use(cors({
    origin: true,                                       // Tutti i domini client possono accedere
    credentials: true                                   // Accetta cookies..
}));                                        
app.use(express.json());                                // TRASFORMA *Tutte le rotte il body delle richieste in JSON!
app.use(cookieParser());                                // Gestione dei cookie


connectionDb();                                         // All'avvio applica connsessione al DB

app.use(transactionRoutes);                             // Carica rotte per gestire le transazioni

// // ********** PER DEBUG **********
// app.use((req, res, next) => {
//     console.log("Request Data: " + `${req.method} ${req.url}`);         // Logga il metodo e l'URL della richiesta
//     next(); // Passa al middleware successivo
// });
// *******************************

// STARTA E VERIFICA CONNESSIONE SERVER 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});