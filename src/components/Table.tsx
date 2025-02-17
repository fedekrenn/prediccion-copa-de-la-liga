import { useEffect, useRef } from "react";
// Libraries
import autoAnimate from "@formkit/auto-animate";

type Params = {
  children: React.ReactNode;
};

export default function Table({ children }: Params) {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <table className="w-auto mx-auto text-xs sm:text-sm" ref={parent}>
      {children}
    </table>
  );
}
