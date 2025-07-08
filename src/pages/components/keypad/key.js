import { useContext } from "react";
import { KeyContext } from "@/pages/keyContext";

export default function Key({ value }) {
    const { checkValue } = useContext(KeyContext);

    return (
        <button type="button" className={`key ${value === 'enter' ? 'enter' : ''}`} onClick={() => checkValue(value)}>
            {value}
        </button>
    );
}