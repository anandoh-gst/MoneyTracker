import express              from 'express';
import { getAllElements, addElement, deleteElement } from '../controllers/transactionControllers.js';
import Transaction          from '../models/transaction.js';
import User                 from '../models/user.js';
import TestTransaction      from '../models/test_transaction.js';


const router = express.Router();

// TRANSACTIONS 
router.get('/api/transactions',                 getAllElements(Transaction, "Transactions"));               /* GET ALL TRANSACTIONS */
router.post('/api/transaction',                 addElement(Transaction, "Transaction"));                    /* ADD NEW TRANSACTION */
router.delete('/api/transaction/:id',           deleteElement(Transaction, "Transaction"));                 /* DELETE TRANSACTION */

// TEST TRANSACTIONS
router.get('/api/testTransactions',             getAllElements(TestTransaction, "Transactions"));           /* GET ALL  */
router.post('/api/testTransaction',             addElement(TestTransaction, "Transaction"));                /* ADD NEW  */
router.delete('/api/testTransaction/:id',       deleteElement(TestTransaction, "Transaction"));             /* DELETE  */

// USERS
router.get('/api/users',                        getAllElements(User, "Users"));                             /* GET ALL USERS */
router.post('/api/user',                        addElement(User, "User"));                                  /* ADD NEW USER */
router.delete('/api/user/:id',                  deleteElement(User, "User"));                               /* DELETE USER */

// LOGIN
// TODO

// COOKIES
router.get('/api/set-cookie',                   (req, res) => {

    // res.cookie('Set-Cookie', 'newUser=true', { expires: new Date(Date.now() + 900000) }); // expires in 15 minutes

    res.cookie("newUser", false);
    res.cookie("isUsername", true, { maxAge: 450000, httpOnly: true });

    res.send('Congrats, Cookie set!');

})
router.get('/api/read-cookie',                  (req, res) => {

    const cookies = req.cookies;
    console.log(cookies.newUser);

    res.json(cookies);
    
})


export default router;