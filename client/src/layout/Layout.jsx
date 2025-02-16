import NavPanel from "./NavBar/NavPanel";
import ExplorerPanel from "./Explorer/ExplorerPanel";
import MainView from "./MainView";

export default function Layout() {

    return (
        <div className="flex overflow-hidden w-full h-full">

            <div>
                <NavPanel />
            </div>

            <div className="flex bg-white overflow-hidden flex-1 dark:bg-[#191919] h-full gap-4">
                <ExplorerPanel />
                <MainView />
            </div>

        </div>
    );
}
