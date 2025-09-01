import ToggleBar from "@/app/components/ToggleBar.jsx";
import SearchModal from "@/app/layout/Modal/SearchModal.jsx";
import Layout from "@/app/layout/Layout.jsx";

export default function Index() {
  return (
    <div className="flex flex-col w-screen h-screen relative font-inter">
      <SearchModal />
      <Layout />
      <ToggleBar />
    </div >
  );
}
