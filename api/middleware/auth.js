import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {

    const token = req.header('Authorization')?.replace('Bearer ', '');                  // Ottieni il valore del token filtrando la stringa 'Bearer '

    if(!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);                     // Verifica token con dati dell'utente..
        req.user = verified;                                                            // Salva i dati dell'utente nella richiesta
        next();                                                                         // Passa al prossimo middleware o route handler
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' }); // TODO
    }

};

export default auth;