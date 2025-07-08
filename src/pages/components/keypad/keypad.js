import KeyRow from "./keyRow";
import Icon from "../icon";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Keypad() {
    const keys1 = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const keys2 = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'e'];
    const keys3 = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', <Icon icon={faDeleteLeft} />];
    return (
        <div className="keypad">
            <KeyRow keys={keys1} />
            <KeyRow keys={keys2} />
            <KeyRow keys={keys3} />
        </div>
    )
}