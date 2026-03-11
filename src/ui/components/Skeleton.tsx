type Params = {
  background?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  center?: boolean;
};

export default function Skeleton({
  background = "rgba(255, 255, 255, 0.06)",
  color = "rgba(255, 255, 255, 0.14)",
  width = 500,
  height = 50,
}: Params) {
  const containerConfig = {
    backgroundColor: background,
    width,
    height,
  };

  const movementConfig = {
    backgroundColor: color,
  };

  return (
    <div
      className="max-w-full overflow-hidden rounded-[18px] border border-white/6"
      style={containerConfig}
    >
      <div
        className="relative left-2/4 top-2/4 h-[160%] w-20 -translate-x-2/4 -translate-y-2/4 rounded-full blur-3xl animate-[moveToRight_1.7s_infinite] motion-reduce:animate-none"
        style={movementConfig}
      ></div>
    </div>
  );
}
