import { useTranslation } from "react-i18next";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const SwitchLang = () => {

    const { i18n } = useTranslation();

    const switchLanguage = (value: string) => {
        i18n.changeLanguage(value);
    }

    return (
        <div className="flex items-center gap-1">
            <span className="fi fi-gb cursor-pointer" onClick={() => switchLanguage("en")}></span>
            <span className="fi fi-ru cursor-pointer" onClick={() => switchLanguage("ru")}></span>
        </div>
    )
}

export default SwitchLang