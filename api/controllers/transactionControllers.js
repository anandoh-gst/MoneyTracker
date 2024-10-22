import Transaction          from '../models/transaction.js';
import User                 from '../models/user.js';
import TestTransaction      from '../models/test_transaction.js';



/* GET ALL Elements */
export const getAllElements = (model, elementName) => async (req, res) => {
    
    try {
        const results = await model.find();                             // CERCA TUTTI GLI ELEMENTI
        res.json(results);                                              // RITORNA ELEMENTI IN JSON
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch results of ${elementName}` });
    }
}


/* ADD NEW Element */
export const addElement = (model, elementName) => async (req, res) => {

    const data = req.body;

    try {
        const element = await model.create(data);                                       // CREA NUOVO ELEMENTO CON I DATI DI REQ.BODY
        res.status(201).json(element);                                                  // RITORNA L'ELEMENTO CREATO
    } catch (error) {
        console.error(`🚀 : Sorry, Failed to create ${elementName}`);
        res.status(500).json({ error: error.message + ` Sorry, Failed to create ${elementName}` });
    }
};


/* DELETE ELEMENT */
export const deleteElement = (model, elementName) => async (req, res) => {

    const { id } = req.params;                                                  

    try {
        const element = await model.findByIdAndDelete(id);            
        if (!element) {
            return res.status(404).json({ error: ` Sorry, any ${elementName} found with id: ` + id });
        }
        res.json({ message: `${elementName} deleted successfully` });
    } catch (error) {
        res.status(500).json({ error: `Failed to delete ${elementName}` });
    }
}