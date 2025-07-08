import Key from "./key"

export default function KeyRow({ keys }) {
    return (
        <div className="key-row">
            {keys.map((item, index) => (
                <Key key={index} value={item} />
            ))}
        </div>
    )
}