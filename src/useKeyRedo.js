import { useEffect } from "react";
export function useKeyRedo(key, action) {
  // ===>> "ESC key"
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [action, key]);
}
