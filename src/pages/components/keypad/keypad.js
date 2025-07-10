import { useContext } from "react";
import { KeyContext } from "@/pages/keyContext";
import KeyRow from "./keyRow";
import Icon from "../icon";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Keypad() {
  const { keyStates } = useContext(KeyContext);

  const keys1 = keyStates.slice(0, 10);
  const keys2 = keyStates.slice(10, 19);
  const keys3 = keyStates.slice(19);

  return (
    <div className="keypad">
      <KeyRow keys={keys1} />
      <KeyRow keys={keys2} />
      <KeyRow keys={keys3} />
    </div>
  );
}
  




// import KeyRow from "./keyRow";
//     import Icon from "../icon";
//     import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

//     export default function Keypad() {
//         const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
//         const keys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
//         const keys3 = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', <Icon icon={faDeleteLeft} />];
//         return (
//             <div className="keypad">
//                 <KeyRow keys={keys1} />
//                 <KeyRow keys={keys2} />
//                 <KeyRow keys={keys3} />
//             </div>
//         )
//     }