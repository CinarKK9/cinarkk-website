import { useEffect, useState } from "react";
import axios from 'axios'

function ClickerGame() {
  const [clickCount, setClickCount] = useState(0)
  const [level, setLevel] = useState(0)
  const [err, setErr] = useState(false)
  const [country, setCountry] = useState('')
  
  const levelUpCost = Math.ceil(((level * level) *10) + 10 || 10)
  const levelClickMultiplier = Math.ceil(level * 1.3 || 1)


  const handleLevelUp = () => {
    if(clickCount >= levelUpCost) {
        setClickCount(Math.ceil(clickCount - levelUpCost))
        setLevel(level + 1)
    }

    else {
        setErr(true)
        setTimeout(() => {setErr(false)}, 500)
    }
  }


  useEffect(() => {
    axios.get('https://geolocation-db.com/json/').then((response) => {
        setCountry(response.data.country_name)
    })
  }, [])

  const handleClick = () => {
    setClickCount(clickCount + (1 * levelClickMultiplier || 1))
  }
  return (
    <>
      <h1 style={{textAlign: "center"}}>Clicker Game {country}</h1>
      <div className="gameContainer">
        <div>
          <span>Points per Click: {levelClickMultiplier} | </span>
          <span>Level Up Cost: {levelUpCost}</span>
        </div>
        <h2>Level: {level}</h2>
        <span>{err}</span>
        <h1 className={err ? 'error clicker' : ''}>Points: {clickCount}</h1>
        <div>
          <button onClick={handleClick}>Click</button>
          <button onClick={handleLevelUp}>Level Up</button>
        </div>
      </div>
    </>
  );
}

export default ClickerGame;
