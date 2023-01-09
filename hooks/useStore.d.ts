export interface Store {
    set: (fn: (state: Store) => void) => void;
}
