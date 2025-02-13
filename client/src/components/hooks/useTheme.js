import { useLocalStorage } from "./useLocalStorage";

export default function useTheme() {
  const [isDark, setIsDark] = useLocalStorage("simple-code-viewer-wants-dark-theme", true);
  
  return {
    isDark,
    toggleTheme: () => setIsDark(prev=> !prev),
  }
}
