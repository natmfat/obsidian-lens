import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";

const variantApp = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },
};

const AppIcon = ({
    className,
    children,
    ...props
}: ComponentPropsWithoutRef<"div">) => {
    return (
        <motion.div variants={variantApp}>
            <div
                className={twMerge(
                    "h-10 w-10 rounded-full grid place-items-center bg-slate-200 cursor-pointer",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        </motion.div>
    );
};

export default AppIcon;
