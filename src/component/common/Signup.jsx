import React, { useState } from "react";

export default function Signin() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  // Validazione Inputs
  const validateForm = () => {

    let isValid = true;
    const invalidInputs = { username: "", email: "", password: "" };
    const stringUsername = "Username";
    const stringEmail = "Email Address";
    const stringPassword = "Password";


    // Messaggio di Errore
    function errorMessage(stringInput) {
      return `Invalid ${stringInput}, please enter a valid ${stringInput}.`;
    }

    // Validazione Username
    if (username.length < 4) {
      invalidInputs.username = errorMessage(stringUsername);;
      isValid = false;
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
    const url = import.meta.env.VITE_API_URL + "/signup";

    try {
      // Fetch request to API
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });

      const data = await response.json(); // Parse JSON response body if present

      if (response.ok) {
        // console.log("User signed up successfully!");
        // console.log("Submitting form...");
        // console.log(" username:", username + " email:", email + " password:", password);
      } else {
        setErrors({email: data.error || "Zio l'email c'è già!" });
        console.warn(data.error);
        throw new Error("Failed to sign up");
      }

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign up</h2>

      {/* Username */}
      <label htmlFor="username">Username</label>
      <input
        id="username"
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <div className="error-message">{ errors.username }</div>

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

      <button type="submit">Sign up</button>
    </form>
  );
}
