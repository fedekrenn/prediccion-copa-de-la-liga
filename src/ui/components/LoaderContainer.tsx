// Components
import Skeleton from "@components/Skeleton.tsx";

export default function LoaderContainer() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center py-6">
        <div className="h-11 w-11 rounded-full border-2 border-white/10 border-t-emerald-300 animate-spin"></div>
      </div>
      <Skeleton width={"100%"} height={88} />
      {Array.from({ length: 28 }).map((_, index) => (
        <Skeleton key={index} width={"100%"} height={54} />
      ))}
    </div>
  );
}
