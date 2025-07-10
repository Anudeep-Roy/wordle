import { useState, useEffect } from "react";
import { KeyContext } from "./keyContext";
import Header from "./components/header";
import Grid from "./components/grid";
import Keypad from "./components/keypad/keypad";
import data from '../words.json';


export default function Wordle() {
  const words = data.words;
  const [guess, setGuess] = useState("");
  const [guessArray, setGuessArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [currentWord, setCurrentWord] = useState([]);
  const [currentRow, setCurrentRow] = useState(0);
  const [resultObj, setResultObj] = useState([]);
  const [currentColumn, setCurrentColumn] = useState(0);
  const [grid, setGrid] = useState([
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ]);
  const [keyStates, setKeyStates] = useState(() => {
  const allKeys = [
    ...'qwertyuiop'.split(''),
    ...'asdfghjkl'.split(''),
    'enter',
    ...'zxcvbnm'.split(''),
    , 'delete'
  ];
  return allKeys.map(k => ({ value: k, symbol: '*' }));
});

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
    console.log(words[randomIndex]);
  }, [])

  useEffect(() => {
    const handleKeyPress = (e) => {
      const currentkey = e.key;
      if (/^[a-zA-Z]$/.test(currentkey)) {
        enterLetter(currentkey);
      } else if (currentkey === 'Enter') {
        validateWord();
      } else if (currentkey === 'Backspace') {
        console.log('Back');
        backspace();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentColumn]);


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
    if (currentColumn < 5 && (letter!='enter' || letter!='Enter')) {
      let userRow = document.querySelector(`.board .row:nth-child(${currentRow + 1})`);
      let userCell = userRow.querySelector(`.box:nth-child(${currentColumn + 1})`);
      userCell.textContent = letter;
      setCurrentColumn(prev => prev + 1);
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
      setGuess(currentGuess.join(''));
      console.log(currentGuess.join(''));
      verifyGuess(currentGuess.join(''));
      setCurrentColumn(0);
      setCurrentRow(prev => prev + 1);
    }
  }
  function verifyGuess(guess) { 
    let result = [];
    console.log("guess", guess);
    console.log("current", currentWord);
    if (currentWord == guess) {
      console.log("Oi ! u have guessed it ryt ");
      result = ["+", "+", "+", "+", "+"];

    } else {
      setGuessArray(guess.split(''));
      let guessedArray = guess.split('');
      let currentWordArray = currentWord.split('');
      let obj = {};
      for (let i = 0; i < currentWord.length; i++) {
        if (obj[currentWord[i]]) {
          obj[currentWord[i]] += 1;
        } else {
          obj[currentWord[i]] = 1;
        }
        
      }
      console.log('obj',obj)
      for (let i = 0; i < currentWord.length; i++) {
        // if (temp.includes(guess[i])) {
        //   result[i] = "-";
        //   continue;
        // }
        if (currentWord.includes(guessedArray[i])) {
          if (currentWordArray[i] == guessedArray[i] && obj[guessedArray[i]] > 0 ) {
            obj[guessedArray[i]] -= 1;
            result[i] = "+";
          } else {
            for (let k = 0; k < 5; k++){
                if (currentWordArray[k] === guessedArray[k]) {
                  obj[guessedArray[k]] -= 1;
                   result[k] = "+";
                } else {
                   result[i] = "-";
                }
              }
            if (obj[guessedArray[i]] > 0) {
              result[i] = "X";
              obj[guessedArray[i]] -= 1;
              console.log('obj',obj)
            }
            //  temp[i] = result[i];
          }
        } else { 
          result[i] = "-";
          // temp[i] = result[i];
        }
      }
      setResultArray(result);
      console.log(result.join(''));
    }
    let userRow = document.querySelector(`.board .row:nth-child(${currentRow + 1})`);
      for (let i = 0; i < result.length; i++) {
        if (result[i] === '+') {
          let userCell = userRow.querySelector(`.box:nth-child(${i + 1})`);
          userCell.classList.add('right');
        } else if (result[i] === 'X') {
          let userCell = userRow.querySelector(`.box:nth-child(${i + 1})`);
          userCell.classList.add('wrong');
        } else {
          let userCell = userRow.querySelector(`.box:nth-child(${i + 1})`);
          userCell.classList.add('neutral');
        }
      }
    let resultsObj = [];
    let guessedArray = guess.split('');
    for (var i = 0; i < result.length; i++) {
      let vaule = guessedArray[i];
      let symbol = result[i];
      let letter = {
        value: vaule,
        symbol : symbol
      }
      resultsObj.push(letter);
    }
    setResultObj(resultsObj);
    console.log('Result obj : ', resultsObj);
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
    <KeyContext value={{ checkValue, resultObj, guessArray, keyStates, setKeyStates }}>
      <div className="wordle">
        <Header />
        <Grid />
        <Keypad />
      </div>
    </KeyContext>
  );
}
