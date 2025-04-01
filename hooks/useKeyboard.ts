import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface KeyboardStore {
  set: (fn: (state: KeyboardStore) => void) => void;
  keys: string[];
  addKey: (key: string) => void;
  removeKey: (key: string) => void;
}

const useKeyboard = create<KeyboardStore>()(
  immer((set) => ({
    set: (fn) => set(fn),
    keys: [],
    addKey: (key) =>
      set((state) => {
        if (!state.keys.includes(key)) {
          state.keys.push(key);
        }
      }),
    removeKey: (key) =>
      set((state) => {
        const idx = state.keys.indexOf(key);
        if (idx > -1) {
          state.keys.splice(idx, 1);
        }
      }),
  })),
);

export default useKeyboard;

export const registerKeyboard = () => {
  const [addKey, removeKey] = useKeyboard((state) => [
    state.addKey,
    state.removeKey,
  ]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => addKey(e.key);
    const onKeyUp = (e: KeyboardEvent) => removeKey(e.key);

    // regsiter event listeners
    addEventListener("keydown", onKeyDown);
    addEventListener("keyup", onKeyUp);
    return () => {
      removeEventListener("keydown", onKeyDown);
      removeEventListener("keyup", onKeyUp);
    };
  }, []);
};
