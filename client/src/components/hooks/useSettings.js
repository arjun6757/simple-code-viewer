import { useState } from "react";

export default function useSettings() {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);

	return {
		isSettingsOpen,
		toggleSettings: () => setIsSettingsOpen((prev) => !prev),
	};
}
