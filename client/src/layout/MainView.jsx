import Alert from "../components/Alert";
import { useRepo } from "../store/repo";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import Highlight from "../components/Highlight";

export default function MainView() {

    const { loadingInnerText, innerText, errorInnerText, message } = useRepo();
    const { isDark } = useContext(ThemeContext);

    if(message) {
        <Alert message={message} />
    }

    return (
        <div className="overflow-y-scroll scrollbar-thin flex-1 bg-white dark:bg-[#191919]">
            <Highlight loading={loadingInnerText} text={innerText} error={errorInnerText} isDark={isDark} />
        </div>
    );
}

