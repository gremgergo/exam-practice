import React, { useEffect, useState } from "react"
import Character from "./components/Character";
import LoadingMask from "./components/LoadingMask";
import Subscription from "./components/Subscription";

const App = () => {
  const [ characters, setCharacters ] = useState(null);
  const [ delayedComponent, setDelayedComponent ] = useState(false);

  useEffect(function() {
    /* fetch(`https://demoapi.com/api/series/howimetyourmother`)
    .then(response => response.json())
    .then((data) => {
      setCharacters(data)
      
    }) */

    const character = async() => {
      const response = await fetch("https://demoapi.com/api/series/howimetyourmother");
      const data = await response.json();
      setCharacters(data)
    }
    character()
  }, [])
  
  const pull_data = (data) => {
    if(data !== "") {
      setTimeout(() => {
        setDelayedComponent(false)
      }, 5000)
    }
  }

  /* useEffect(() => {
    setInterval(() => {
      setDelayedComponent(true)
    }, 10000)
  }, []) */

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedComponent(true)
    }, 10000);

    return () => {
      clearTimeout(timer)
    }
  }, []) 
  

  return (
    <div>
      <h1>Series Api</h1>
      {
        characters ? characters.map(( character, index ) => <Character key={index} name={character.name} details={character.details}/>) : <LoadingMask />
      }
      { delayedComponent && <Subscription func={pull_data} />}
    </div>
  )
  

}

export default App

/* return (
  <div>
    <h1>Series Api</h1>
    {characters ? characters.map((character) => <Character name={character.name} details={character.details} /> ) : <LoadingMask /> }
  </div>
) */