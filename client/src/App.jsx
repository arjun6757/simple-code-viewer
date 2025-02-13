import ToggleBar from "./components/ToggleBar";
import LivePreview from "./components/LivePreview";
import SearchModal from "./components/Modal/SearchModal.jsx";
import Layout from "./Layout.jsx";

export default function App() {
  return (
    <div className="flex flex-col w-screen h-screen relative font-inter">
      <SearchModal />
      <Layout />
      <ToggleBar />
      <LivePreview />
    </div >
  );
}
