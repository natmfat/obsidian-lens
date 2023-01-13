import { useEffect } from "react";
import useStore from "./useStore";

const useKeyboard = () => {
    const [focusedFile, setFocusedFile, activeFiles, removeActive] = useStore(
        (state) => [
            state.focusedFile,
            state.setFocusedFile,
            state.activeFiles,
            state.removeActive,
        ]
    );

    useEffect(() => {
        const ctrlW = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === "w") {
                e.preventDefault();

                console.log("hmm");

                if (focusedFile) {
                    console.log("hmm 2");
                    removeActive(focusedFile);
                    const newFocus =
                        activeFiles[
                            activeFiles.findIndex(
                                (file) => file.id === focusedFile
                            ) - 1
                        ];

                    console.log(newFocus);
                    setFocusedFile(newFocus?.id || null);
                }
            }
        };

        addEventListener("keydown", ctrlW);

        return () => {
            removeEventListener("keydown", ctrlW);
        };
    }, []);
};

export default useKeyboard;
