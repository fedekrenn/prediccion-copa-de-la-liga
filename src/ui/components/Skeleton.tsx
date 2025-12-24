type Params = {
  background?: string;
  color?: string;
  width?: number | string;
  height?: number | string;
  center?: boolean;
};

export default function Skeleton({
  background = "#425164",
  color = "#68798d",
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
      className="bg-[#425164] overflow-hidden rounded-[5px] max-w-[100%]"
      style={containerConfig}
    >
      <div
        className="h-[110%] w-5 relative -translate-x-2/4 -translate-y-2/4 blur-2xl animate-[moveToRight_1.5s_infinite] left-2/4 top-2/4 animation-timing-function: ease-in-out"
        style={movementConfig}
      ></div>
    </div>
  );
}
