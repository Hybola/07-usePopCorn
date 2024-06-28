import { useEffect } from "react";
export function useKey(key, action) {
  //===> listening to ESC key press to close a movie detail
  useEffect(() => {
    function callback(e) {
      if (e.code.toLowerCase() === key.toLowerCase()) action();
    }
    document.addEventListener("keydown", callback);
    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [key, action]);
}
