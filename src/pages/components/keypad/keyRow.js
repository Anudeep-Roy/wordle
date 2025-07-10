import { useContext, useEffect } from "react";
import Key from "./key";
import { KeyContext } from "@/pages/keyContext";

export default function KeyRow({ keys }) {
  const { resultObj, guessArray, setKeyStates, keyStates } = useContext(KeyContext);

  // Update key states once when resultObj changes
useEffect(() => {
  if (!resultObj || resultObj.length === 0) return;

  setKeyStates(prevState =>
    prevState.map(k => {
      const match = resultObj.find(r => r.value === k.value);
      if (!match) return k;

      const currentSymbol = k.symbol;
      const newSymbol = match.symbol;

      // Symbol priority: + > X > -
      const symbolPriority = { "+": 3, "X": 2, "-": 1, "*": 0 };

      const currentPriority = symbolPriority[currentSymbol] || 0;
      const newPriority = symbolPriority[newSymbol] || 0;

      if (newPriority > currentPriority) {
        return { ...k, symbol: newSymbol };
      }

      return k;
    })
  );
}, [resultObj, setKeyStates]);


  return (
    <div className="key-row">
      {keys.map((item, index) => (
        <Key
          key={index}
          value={item.value}
          symbol={item.symbol}
        />
        
      ))}
    </div>
  );
}
