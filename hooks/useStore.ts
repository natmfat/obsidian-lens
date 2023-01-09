import create from "zustand";
import { immer } from "zustand/middleware/immer";
import { Store } from "./useStore.d";

const useStore = create(
    immer<Store>((set) => ({
        set: (fn) => set(fn),
    }))
);

export default useStore;
