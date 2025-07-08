import Icon from "./icon";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
    return (
        <div className="header">
            <div className="header-left">
                <button type="button">
                    <Icon icon={faBars} />
                </button>
            </div>
        </div>
    )
}