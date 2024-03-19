import { useEffect } from "react";

export function useKeyPress(key, action) {
  useEffect(() => {
    const handleKeyDown = () => {
      action();
    };

    document.addEventListener(key, handleKeyDown);

    return () => {
      document.removeEventListener(key, handleKeyDown);
    };
  }, [action, key]);
}
