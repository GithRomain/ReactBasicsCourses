import { useState, useEffect } from "react";
import Die from "../components/Die/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti"
import "./App.css";

function App() {
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.floor(Math.random() * 6) + 1;
      newDice.push({ value: randomNum, isHeld: false, id: nanoid() });
    }
    return newDice;
  }

  const [dice, setDice] = useState(allNewDice());

  function rollDice() {
    if (tenzies) {
      setDice(allNewDice());
      setTenzies(false);
      return;
    }
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld
          ? die
          : { ...die, value: Math.floor(Math.random() * 6) + 1 };
      })
    );
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allDiceSame = dice.every((die) => die.value === dice[0].value);
    if (allDiceSame) {
      setTenzies(true);
    }
  }, [dice]);

  return (
    <div className="App">
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    </div>
  );
}

export default App;
