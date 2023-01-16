import { ComponentPropsWithoutRef } from "react";
import Portal from "./Portal";

const Modal = ({ ...props }: ComponentPropsWithoutRef<"div">) => {
    return (
        <Portal>
            <div className="fixed">
                <p>Hello World</p>
            </div>
        </Portal>
    );
};

export default Modal;
