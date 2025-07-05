import ToggleBar from "@/components/ToggleBar.jsx";
import SearchModal from "@/layout/Modal/SearchModal.jsx";
import Layout from "@/layout/Layout.jsx";

export default function Index() {
  return (
    <div className="flex flex-col w-screen h-screen relative font-inter">
      <SearchModal />
      <Layout />
      <ToggleBar />
    </div >
  );
}
