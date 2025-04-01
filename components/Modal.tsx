import { motion } from "framer-motion";
import { ComponentPropsWithoutRef, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";

import Portal from "./Portal";

interface ModalProps {
  title?: string;
  setShow: (show: boolean) => void;
}

const variantModal = {
  hidden: {
    opacity: 0,
    y: -50,
  },
  visible: {
    opacity: 1,
    y: 1,
  },
};

const Modal = ({
  children,
  title = "Untitled Window",
  setShow,
  ...props
}: ComponentPropsWithoutRef<"div"> & ModalProps) => {
  return (
    <Portal>
      <div className="fixed right-4 top-4 z-40">
        <motion.div
          className="bg-white rounded-md border shadow-lg max-w-md p-4 overflow-y-auto "
          variants={variantModal}
          initial="hidden"
          exit="hidden"
          animate="visible"
        >
          {title && (
            <div className="flex justify-between items-center mb-4">
              <div className="bg-slate-200 py-0.5 px-2 text-sm rounded-sm flex w-fit border border-slate-300">
                {title}
              </div>
              <div onClick={() => setShow(false)} className="cursor-pointer">
                <IoClose />
              </div>
            </div>
          )}
          {children}
        </motion.div>
      </div>
    </Portal>
  );
};

export default Modal;
