import jwt from 'jsonwebtoken';



/* GET Element */
export const getElement = (model, elementName) => async (req, res) => {
    
    const data = req.body;

    try {
        const results = await model.find(data);                           
        res.json(results);                                              // RITORNA JSON
    } catch (error) {
        res.status(500).json({ error: `Failed to fetch results of ${elementName}` });
    }
}

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
export const addElement = (model, elementName, tokenValue) => async (req, res) => {

    const data = req.body;

    try {
        // GESTIONE API E TOKEN
        const element = await model.create(data);                                       // CREA NUOVO ELEMENTO CON I DATI DI REQ.BODY

        if (tokenValue === "signup") {
            const token = createToken(element._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000,  // 3 giorni
                sameSite: 'Lax',                 // Permetti l'uso cross-origin se necessario
            });
            res.status(201).json({ element: element._id });
        } else {
            res.status(201).json(element);
        }

    } catch (error) {
        // GESTIONE ERRORI 
        if (tokenValue === "signup") {
            const errorMessage = handleErrors(error);
            res.status(400).json({ error: errorMessage });
        } else { //
            console.error(`🚀 : Sorry, Failed to create ${elementName}`);
            res.status(500).json({ error: error.message + ` Sorry, Failed to create ${elementName}` });
        }
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

// CREAZIONE TOKEN JWT
const createToken = ( id ) => {

    const maxAge = 3* 24 * 60 * 60; // 3 hours

    return jwt.sign( { id }, process.env.JWT_SECRET, { expiresIn: maxAge } );

}

// GESTIONE ERRORI
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'That email is not registered';
  }

  // incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'That password is incorrect';
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
}