import NavPanel from "./NavBar/NavPanel";
import MainView from "./MainView";
import Panel from "./Explorer/Panel";

export default function Layout() {

    return (
        <div className="flex overflow-hidden w-full h-full">

            <div>
                <NavPanel />
            </div>

            <div className="flex bg-[var(--hljs)] overflow-hidden flex-1 dark:bg-[var(--hljs)] h-full gap-4">
                <Panel />
                <MainView />
            </div>

        </div>
    );
}
