import type { LiveData } from "@typos/api";

export const Live = ({ liveData }: { liveData: LiveData }) => {
  const { score, status } = liveData;

  const getColor = (status: number) => {
    switch (status) {
      case 1:
        return "bg-green-800";
      case 2:
        return "bg-red-800";
      case 3:
        return "bg-yellow-500 text-black";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className={`text-[0.7rem] ${getColor(status)} rounded-full px-2 py-0`}>
      {score[0]}:{score[1]}
    </div>
  );
};
