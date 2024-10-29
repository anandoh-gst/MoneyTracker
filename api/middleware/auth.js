import jwt from 'jsonwebtoken';


const auth = (req, res, next) => {

    const token = req.cookies.jwt;

    if(!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);                     // Verifica token con dati dell'utente..
        req.user = verified;                                                            // Salva i dati dell'utente nella richiesta
        console.log("🚀 ~ auth ~ req.user:", req.user)
        
        next();                                                                         // Permette il proseguimento con il controllo dell'accesso.

    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }

};

export default auth;