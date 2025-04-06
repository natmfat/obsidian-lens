import { useEffect } from "react";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/react/shallow";

type State = {
  keys: string[];
};

type Actions = {
  addKey: (key: string) => void;
  removeKey: (key: string) => void;
};

// https://zustand.docs.pmnd.rs/integrations/immer-middleware
export const useKeyboardStore = create<State & Actions>()(
  immer((set) => ({
    keys: [],
    addKey: (key) => {
      set((state) => {
        if (!state.keys.includes(key)) {
          state.keys.push(key);
        }
      });
    },
    removeKey: (key) => {
      set((state) => {
        const idx = state.keys.indexOf(key);
        if (idx > -1) {
          state.keys.splice(idx, 1);
        }
      });
    },
  })),
);
