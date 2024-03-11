// Components
import Skeleton from "./Skeleton.tsx";

export default function loaderContainer() {
  return (
    <div className="flex flex-col gap-[5px]">
      <span className="w-4 h-4 block relative shadow-[-24px_0_#fff,24px_0_#fff] box-border animate-[shadowPulse_2s_linear_infinite] mx-auto my-[35px] rounded-[50%]"></span>
      <Skeleton width={"100%"} height={50}/>
      {Array.from({ length: 28 }).map((_, index) => (
        <Skeleton key={index} width={"100%"} height={32} />
      ))}
    </div>
  );
}
