import { ComponentPropsWithoutRef, ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";
import { AnimatePresence, motion } from "framer-motion";
import Modal from "./Modal";

const variantApp = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

interface AppIconProps {
    modalTitle?: string;
    modalChildren?: ReactNode;
}

const AppIcon = ({
    className,
    children,
    modalTitle,
    modalChildren,
    ...props
}: ComponentPropsWithoutRef<"div"> & AppIconProps) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <motion.div variants={variantApp}>
                <div
                    className={twMerge(
                        "h-8 w-8 text-sm rounded-md grid place-items-center bg-slate-200 cursor-pointer",
                        className
                    )}
                    onClick={() => {
                        setShow(!show);
                    }}
                    {...props}
                >
                    {children}
                </div>
            </motion.div>
            <AnimatePresence>
                {show && (
                    <Modal setShow={setShow} title={modalTitle}>
                        <div className="prose prose-slate prose-h1:mb-0">
                            {modalChildren}
                        </div>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
};

export default AppIcon;
