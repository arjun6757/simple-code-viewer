import NavPanel from "./NavBar/NavPanel";
import MainView from "./MainView";
import Panel from "./Explorer/Panel";

export default function Layout() {

    return (
        <div className="flex overflow-hidden w-full h-full">

            <div>
                <NavPanel />
            </div>

            <div className="flex bg-[var(--primary-bg)] overflow-hidden flex-1 h-full gap-4">
                <Panel />
                <MainView />
            </div>

        </div>
    );
}
