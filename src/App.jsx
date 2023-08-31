import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rollCount, setRollCount] = React.useState(1)
    const [bestRollCount, setBestRollCount] = React.useState(
        parseInt(localStorage.getItem("bestRollCount")) || Infinity
      );
      
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true);
            updateBestRollCount(rollCount)
        }
    }, [dice])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }

    function updateBestRollCount(rollCount) {
        if (rollCount < bestRollCount) {
          setBestRollCount(rollCount);
          localStorage.setItem("bestRollCount", rollCount.toString());
        }
      }  
    
    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => (die.isHeld ? die : generateNewDie())));
            setRollCount(prevRollCount => prevRollCount + 1);
        } else {
            setTenzies(false);
            setDice(allNewDice());
            setRollCount(1);
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }    
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <p className="roll-count">Roll Count: {rollCount}</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
            <p className="best-roll-count">
                Best Roll Count: {bestRollCount === Infinity ? "" : bestRollCount}
        </p>
        </main>
    )
}