import Alert from "@/components/Alert";
import Highlight from "@/components/Highlight";
import { useRepo } from "@/store/repo.store";
import { useTheme } from "@/context/ThemeProvider";

export default function MainView() {

    const { loadingInnerText, innerText, errorInnerText, message } = useRepo();
    const { isDark } = useTheme();

    if (message) {
        <Alert message={message} />
    }

    return (
        <div className="overflow-y-scroll scrollbar-thin flex-1 bg-white dark:bg-[#191919]">
            <Highlight loading={loadingInnerText} text={innerText} error={errorInnerText} isDark={isDark} />
        </div>
    );
}

