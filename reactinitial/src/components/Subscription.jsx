import React from "react";
import { useState, useEffect } from "react";
import LoadingMask from "./LoadingMask";
import Button from "@mui/material/Button"

function Subscription(func) {
  const [ email, setEmail ] = useState("");
  const [ isDisabled, setIsDisabled ] = useState(true);
  const [ loading, setLoading ] = useState(false);
  const [ subscribed, setSubscribed ] = useState("")
  
  
  const validateEmail = (email) => typeof email === "string" && email.includes("@") && email.includes(".");
 
  const onEmailChange = (event) => {
      setEmail(event.target.value);
      validateEmail()
  }

  const handleSubmit = (event) => {
      event.preventDefault();
      setLoading(true)
      fetch("https://demoapi.com/api/series/newsletter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email }),
      })
      .then((response) => response.json())
      .then((data) => setSubscribed(data))
      .finally(() => {
          setLoading(false)
      })
  }


  useEffect(() => {
    func(subscribed)

  }, [ func, subscribed ]);
  
  useEffect(() => {
    setIsDisabled(!validateEmail(email))
  
  }, [ email ]);
  

  return (
    <>
      <form action="">
        <h3>Subscribe to our newsletter!</h3>
        { !loading && (
            <>
                <input type="text" value={ email } onChange={ onEmailChange }/>
                <Button  variant="contained" size="small" disabled={ isDisabled } type="submit" onClick={ handleSubmit }>Subscribe!</Button>
            </>
        )}
        { loading && <LoadingMask /> }
        { subscribed && <p>Subscribed!</p> }
      </form>
    </>
  );
}

export default Subscription;
