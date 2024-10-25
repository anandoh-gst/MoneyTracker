import express              from 'express';
import { getElement, getAllElements, addElement, deleteElement } from '../controllers/transactionControllers.js';
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

// ADMIN MANAGE USERS
router.get('/api/users',                        getAllElements(User, "Users"));                             /* GET ALL USERS */
router.delete('/api/user/:id',                  deleteElement(User, "User"));                               /* DELETE USER */

// SIGNUP
router.post('/api/signup',                      addElement(User, "User", "signup"));                                  /* ADD NEW USER */

// LOGIN
router.post('/api/login',                       getElement(User, "User", "login"));                                  /* GET USER */


export default router;