import express              from 'express';
import { getElement, getAllElements, addElement, deleteElement } from '../controllers/transactionControllers.js';
import Transaction          from '../models/transaction.js';
import User                 from '../models/user.js';
import TestTransaction      from '../models/test_transaction.js';
import auth                 from '../middleware/auth.js';


const router = express.Router();

// TRANSACTIONS 
router.get('/api/transactions',                 auth,       getAllElements(Transaction, "Transactions"));               /* GET ALL TRANSACTIONS */
router.post('/api/transaction',                 auth,       addElement(Transaction, "Transaction"));                    /* ADD NEW TRANSACTION */
router.delete('/api/transaction/:id',           auth,       deleteElement(Transaction, "Transaction"));                 /* DELETE TRANSACTION */

// TEST TRANSACTIONS              
router.get('/api/testTransactions',             auth,       getAllElements(TestTransaction, "Transactions"));           /* GET ALL  */
router.post('/api/testTransaction',             auth,       addElement(TestTransaction, "Transaction"));                /* ADD NEW  */
router.delete('/api/testTransaction/:id',       auth,       deleteElement(TestTransaction, "Transaction"));             /* DELETE  */

// ADMIN MANAGE USERS
router.get('/api/users',                        auth,       getAllElements(User, "Users"));                             /* GET ALL USERS */
router.delete('/api/user/:id',                  auth,       deleteElement(User, "User"));                               /* DELETE USER */

// SIGNUP
router.post('/api/signup',                      addElement(User, "User", "signup"));                        /* ADD NEW USER */

// LOGIN
router.post('/api/login',                       getElement(User, "User", "login"));                         /* GET USER */


export default router;