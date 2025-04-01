import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  [key: string]: any;
}

const PortalNothing = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};

const PortalSomething = ({ portalRef, children, ...props }: PortalProps) => {
  useEffect(() => {
    if (portalRef.current) {
      Object.assign(portalRef.current, props);
      document.body.appendChild(portalRef.current);
    }

    () => portalRef.current?.remove();
  }, []);

  return createPortal(children, portalRef.current);
};

const Portal = ({ children, ...props }: PortalProps) => {
  const portalRef = useRef(
    typeof window === "undefined" ? null : document.createElement("div"),
  );

  if (portalRef.current === null) {
    return <PortalNothing>{children}</PortalNothing>;
  }

  return <PortalSomething portalRef={portalRef}>{children}</PortalSomething>;
};

export default Portal;
