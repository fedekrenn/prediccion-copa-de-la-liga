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
    <table className="w-auto mx-auto text-sm sm:text-base" ref={parent}>
      {children}
    </table>
  );
}
