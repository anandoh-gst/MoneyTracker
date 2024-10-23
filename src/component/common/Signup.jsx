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

    // Validazione Username
    if (username.length < 3) {
      invalidInputs.username = `Invalid ${stringUsername}, please enter a valid ${stringUsername}.`;
      isValid = false;
    }

    // Validazione Email
    if (!email.includes("@")) {
      invalidInputs.email = `Invalid ${stringEmail}, please enter a valid ${stringEmail}.`;
      isValid = false;
    }

    // Validazione password
    if (password.length < 6) {
      invalidInputs.password = `Invalid ${stringPassword}, please enter a valid ${stringPassword}.`;
      isValid = false;
    }

    setErrors(invalidInputs);
    return isValid;
  };

  // Gestione Submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Check form validity
    if (!validateForm()) {
      return setIsSubmitting(false);
    }

    console.log("Submitting form...");
    console.log(" username:", username);
    console.log(" email:", email);
    console.log(" password:", password);

    // Sign Up Api Call

    //     const url = import.meta.env.VITE_API_URL + "/signup";
    // const response = await fetch(url, {
    //   method: "POST",
    //   headers: { "Content-type": "application/json" },
    //   body: JSON.stringify({ username, email, password, role }),
    // });
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

      <button type="submit">Sign up</button>
    </form>
  );
}
