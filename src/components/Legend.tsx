export default function Legend() {
  return (
    <div className="flex justify-center items-end gap-5 text-[0.6em] mx-0 mt-5 mb-2">
      <div className="text-center">
        <p className="w-[70px] mb-[5px] mx-auto">Copa Libertadores</p>
        <div className={"inline-block w-2.5 h-2.5 green"}></div>
      </div>
      <div className="text-center">
        <p className="w-[70px] mb-[5px] mx-auto">Copa Sudamericana</p>
        <div className={"inline-block w-2.5 h-2.5 yellow"}></div>
      </div>
      <div className="text-center">
        <p className="w-[70px] mb-[5px] mx-auto">Descendería por tabla</p>
        <div className={"inline-block w-2.5 h-2.5 red"}></div>
      </div>
      <div className="text-center">
        <p className="w-[70px] mb-[5px] mx-auto">Descendería por promedios</p>
        <div className={"inline-block w-2.5 h-2.5 dark-red"}></div>
      </div>
    </div>
  );
}
