import { useContext, useEffect } from "react";
import { KeyContext } from "@/pages/keyContext";
import Icon from "../icon";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Key({ value, icon, symbol }) {
    const { checkValue } = useContext(KeyContext);

    return (
        <button type="button" className={`key ${value === 'enter' ? 'enter' : ''} ${symbol==="+" ? "green" : symbol==="X" ? "yellow" : symbol==="-" ? "gray" : ""}`} onClick={() => checkValue(value)}>
            {value==='delete'? <Icon icon={faDeleteLeft} /> : value}
        </button>
    );
}