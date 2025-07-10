import { useContext, useEffect } from "react";
import { KeyContext } from "@/pages/keyContext";
import Icon from "../icon";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

export default function Key({ value, icon, symbol }) {
    const { checkValue } = useContext(KeyContext);

    return (
        <button type="button" className={`key ${value === 'enter' ? 'enter' : ''} `} onClick={() => checkValue(value)}>
            {value==='delete'? <Icon icon={faDeleteLeft} /> : value}
        </button>
    );
}