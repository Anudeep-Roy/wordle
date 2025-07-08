import { useState, useEffect } from "react";
import { KeyContext } from "./keyContext";
import Header from "./components/header";
import Grid from "./components/grid";
import Keypad from "./components/keypad/keypad";



export default function Wordle() {
  const words = ['heart', 'lions', 'cloud', 'space', 'apple'];
  const [word, setWord] = useState("");
  const [currentWord, setCurrentWord] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [grid, setGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    console.log(words[randomIndex]);
  }, [])

  function checkValue(value) {
    if (value === "enter") { 
      validateWord();
    } else if (value.length === 1) {
      enterLetter(value);
    } else {
      backspace();
    }
  }

  function enterLetter(letter) {
    console.log('letter : ', letter);
    if (currentColumn < 5 && letter!='enter') {
      let userRow = document.querySelector(`.board .row:nth-child(${currentRow + 1})`);
      let userCell = userRow.querySelector(`.box:nth-child(${currentColumn + 1})`);
      userCell.textContent = letter;
      setCurrentColumn(currentColumn + 1);
    }
  }

  function validateWord() {
    if (currentColumn == 5) { 
      let currentGuess = [];
      let userRow = document.querySelector(`.board .row:nth-child(${currentRow + 1})`);
      for (var i = 1; i <= 5; i++) {
        let userCell = userRow.querySelector(`.box:nth-child(${i})`);
        currentGuess.push(userCell.textContent);
      }
      setWord(currentGuess.join(''));
      console.log(currentGuess.join(''));
      setCurrentColumn(0);
      setCurrentRow(currentRow + 1);
    }
  }

  function backspace() {
    if (currentColumn > 0) {
      const userRow = document.querySelector(`.board .row:nth-child(${currentRow + 1})`);
      const userCell = userRow.querySelector(`.box:nth-child(${currentColumn})`);
      userCell.textContent = '';
      setCurrentColumn(currentColumn - 1);
    }
  }

  return (
    <KeyContext value={{ checkValue }}>
      <div className="wordle">
        <Header />
        <Grid />
        <Keypad />
      </div>
    </KeyContext>
  );
}
