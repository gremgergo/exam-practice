import React, { useState } from "react";
import "./Character.css";
import Button from "@mui/material/Button";

function Character({ name, details }) {

  const [ isVisible, setVisible ] = useState(false);
  const [ buttonText, setButtonText ] = useState("Show More!");

  const visibleHandler = () => {
    setVisible(!isVisible);
    textChange();
  }

  const textChange = () => {
    if(buttonText === "Show More!") {
      setButtonText("Show Less!");
    } else {
      setButtonText("Show More!")
    }
  }

  return (
    <>
      <h4>{ name }</h4>
      <p className={ isVisible ? "" : "hidden" }>{ details }</p>
      <Button variant="contained" size="small" onClick={ visibleHandler }>{ buttonText }</Button>
    </>
  )
  
  
}

export default Character

/* const [ showMore, setShowMore ] = useState(false); */


/* return (
  <div>
      {name}
      <button onClick={ () => setShowMore(!showMore) }>{ showMore ? 'Show Less!' : 'Show More!' }</button> 
      { showMore && <div>{details}</div> } 
  </div>
) */