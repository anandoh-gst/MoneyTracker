import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); // GESTISCE ROTTE


  // Validazione Inputs
  const validateForm = () => {

    let isValid = true;
    const invalidInputs = { email: "", password: "" };
    // const stringUsername = "Username";
    const stringEmail = "Email Address";
    const stringPassword = "Password";


    // Messaggio di Errore
    function errorMessage(stringInput) {
      return `Invalid ${stringInput}, please enter a valid ${stringInput}.`;
    }

    // Validazione Email
    if ( !isValidEmail(email) ) {
      invalidInputs.email = errorMessage(stringEmail);;
      isValid = false;
    }

    // Validazione password
    if (password.length < 6) {
      invalidInputs.password = errorMessage(stringPassword);
      isValid = false;
    }

    setErrors(invalidInputs);
    
    return isValid;
  };


  // Verifica Email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };


  // Gestione Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Check form validity
    if (!validateForm()) {
      return setIsSubmitting(false);
    }

    // Sign Up Api Call
    const url = import.meta.env.VITE_API_URL + "/login";

    try {
      // Fetch request to API
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ 
          email, 
          password, 
        }),
      });

      const data = await response.json(); // Parse JSON response body if present

      if (response.ok) {
        // LOGS UTENTE
        console.log("Submitting form... User signed up successfully!");
        console.log("");
        console.log(" email:", email + " password:", password);
        // REINDIRIZZAMENTO HOME
        navigate('/'); 
      } else {
        // Gestione MESSAGGI DI ERRORE
        const errorMessage = data.errorMessage || "Failed to login up";

        if( data.errorType === "email" ){
          setErrors({email: data.errorMessage});
        } else{
          setErrors({password: data.errorMessage});
        }
        throw new Error(errorMessage);

      }

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      {/* Email */}
      <label htmlFor="email">Email</label>
      <input
        id="email"
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <div className="error-message">{ errors.email }</div>

      {/* Password */}
      <label htmlFor="password">Password</label>
      <input 
        id="password" 
        type="password" 
        name="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)} 
        required 
      />
      <div className="error-message">{ errors.password }</div>
      
      {/* Submit */}
      <button type="submit">login</button>
    </form>
  )
}
