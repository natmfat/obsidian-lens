import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useKeyboardStore } from "./useKeyboardStore";

/**
 * Register keyboard event listeners
 */
export const useKeyboard = () => {
  // arrays are no longer stable with zustand v5
  // https://github.com/pmndrs/zustand/issues/2741
  // https://zustand.docs.pmnd.rs/hooks/use-shallow#useshallow-%E2%9A%9B%EF%B8%8F
  const [addKey, removeKey] = useKeyboardStore(
    useShallow((state) => [state.addKey, state.removeKey]),
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => addKey(e.key);
    const onKeyUp = (e: KeyboardEvent) => removeKey(e.key);
    addEventListener("keydown", onKeyDown);
    addEventListener("keyup", onKeyUp);
    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
    };
  }, []);
};
