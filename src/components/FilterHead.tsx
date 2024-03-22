// Icons
import caretDown from "@assets/caretDown.svg";
import caretUp from "@assets/caretUp.svg";

type Params = {
  filterOrder: string;
  title: string;
};

export default function FilterHead({ filterOrder, title }: Params) {
  return (
    <div className="cursor-pointer align-middle flex items-center">
      {filterOrder === "asc" ? (
        <img className="w-4 sm:w-5" src={caretDown.src} alt="caretDown" />
      ) : (
        <img className="w-4 sm:w-5" src={caretUp.src} alt="caretUp" />
      )}
      <span className="font-thin text-xs">{title}</span>
    </div>
  );
}
