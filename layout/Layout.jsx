import NavPanel from "./NavBar/NavPanel";
import MainView from "./MainView";
import Panel from "./Explorer/Panel";

export default function Layout() {

    return (
        <div className="flex overflow-hidden w-full h-full">

            <div>
                <NavPanel />
            </div>

            <div className="flex bg-white overflow-hidden flex-1 dark:bg-[#191919] h-full gap-4">
                <Panel />
                <MainView />
            </div>

        </div>
    );
}
