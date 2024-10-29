import React, { useState, useEffect } from "react";
import "../../css/App.css";
import { useNavigate } from "react-router-dom";

function App() {

  const [name, setName]                         = useState("");
  const [datetime, setDatetime]                 = useState("");
  const [description, setDescription]           = useState("Mese: " + getCurrentMonthName()); // DEFAULT MESE "CORRENTE"
  const [transactions, setTransactions]         = useState("");
  const navigate                                = useNavigate();



  // AGGIUNGI TRANZAZIONE
  function addNewTransaction(event) {
    event.preventDefault();

    // const url = process.env.REACT_APP_API_URL;
    const url = import.meta.env.VITE_API_URL + "/transaction";
    const price = name.split(" ")[0]; // il prezzo sarà la prima parte del valore name
    const transactionName = name.substring(price.length + 1); // di conseguenza il nome rimane la seconda parte

    fetch(url, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: transactionName,
        price,
        datetime,
        description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          const errorMessage = "Sorry, Failed to create transaction";
          console.error("🚀 :" + errorMessage);
          throw new Error("There are a issue with your Network response! 😰");
        }
        return response.json();
      })
      .then((json) => {
        setName("");
        // setDatetime('');
        // setDescription('');

        // Update transactions state after successful POST request
        getTransactions().then((transactions) => {
          setTransactions(transactions);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }


  // CANCELLA TRANSAZIONE
  function deleteTransaction(transactionIndex) {
    const url =
      import.meta.env.VITE_API_URL + "/transaction/" + transactionIndex;

    fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        console.log("Transaction deleted", json);

        getTransactions().then((transactions) => {
          // Aggiorna lo stato delle transazioni dopo l'eliminazione
          setTransactions(transactions);
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }


  // RECUPERA TRANSAZIONI
  async function getTransactions() {

    try {
      const url                     = import.meta.env.VITE_API_URL + "/transactions";
      const response                = 
        await fetch(url, {
          method: 'GET',
          credentials: 'include',  // Importante per inviare i cookie
          headers: {
            'Content-Type': 'application/json'
          }
        });

      // Verifica se risposta è ok (status 200-299)
      if (!response.ok) { 

        const errorData             = await response.json();
        const errorMessage          = new Error( errorData.error  ||  "Error: cannot fetch data!");

        errorMessage.code           = response.status || "";
        errorMessage.statusText     = "Status: " + response.status + " - " + response.statusText;
        throw errorMessage;
      }

      return await response.json();
      
    } catch (error) {
      // GESTIONE ERRORI
      if(error.code === 401){
        
        console.warn("message: ", error.message);
        navigate("/login");
      }
      
      console.error("There was a problem with the fetch operation.");
      console.warn(error.statusText)
      console.warn(error);
    }

  }


  // RECUPERO NOME MESE CORRENTE
  function getCurrentMonthName() {
    const now = new Date();
    const monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    return monthNames[now.getMonth()];
  }


  // RECUPERO NOME MESE PRECEDENTE
  function getPreviousMonthName() {
    const now = new Date();
    now.setMonth(now.getMonth() - 1); // Decrementa il mese di uno
    const monthNames = [
      "Gennaio",
      "Febbraio",
      "Marzo",
      "Aprile",
      "Maggio",
      "Giugno",
      "Luglio",
      "Agosto",
      "Settembre",
      "Ottobre",
      "Novembre",
      "Dicembre",
    ];
    return monthNames[now.getMonth()];
  }


  // FORMATTA DATA CORRENTE
  function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  // FORMATTA DATA
  function formatDateTime(datetimeString) {
    const date = new Date(datetimeString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year} ${hours}:${minutes}`;
  }


  // AGGIORNA IN TEMPO REALE
  useEffect(() => {
    setDatetime(getCurrentDateTime());

    getTransactions().then((transactions) => {
      setTransactions(transactions);
    });
  }, []);


  // CALCOLA BILANCIO SPESE
  let balance = 0;
  for (const transaction of transactions) {
    balance = balance + transaction.price; // somma ogni transazione
  }
  balance = balance.toFixed(2); // ex 544.00
  const cents = balance.split(".")[1]; // decimali
  balance = balance.split(".")[0]; // intero
  const valuta = " €";

  // View
  return (
    <>
      <main>
        <h1>
          {balance}
          <span>{cents}</span>€
        </h1>

        <form onSubmit={addNewTransaction}>
          {/* Transaction name and date */}
          <div className="basic">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"+/-200€ + name of transaction"}
              required
            />

            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="description">
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"Write the description of transaction"}
              required
            />
          </div>

          {/* ADD TRANSACTION BUTTON */}
          <button type="submit">Add new transaction</button>
        </form>

        <div className="transactions">
          {transactions.length > 0 &&
            transactions.map((transaction) => (
              <div className="transaction" key={transaction._id}>
                {/* Transaction Name and Description */}
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>

                {/* Transaction Price and Date */}
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price}
                  </div>
                  <div className="datetime">
                    {formatDateTime(transaction.datetime)}
                  </div>
                </div>

                {/* Delete Transaction Button */}
                <button
                  className="delete-button"
                  onClick={() => deleteTransaction(transaction._id)}
                >
                  Cancella
                </button>

                <div>
                  {/* Move Up
                <button
                    className="move-button"
                    onClick={ () => moveTaskUp(transaction._id) }>
                    Move Up
                </button>

                Move Down
                <button
                    className="move-button"
                    onClick={ () => moveTaskDown(transaction._id) }>
                    Move Down
                </button> */}
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
}

export default App;
