import { useRecoilValue } from "recoil";
import { ReactComponent as ConsoleIcon } from "../assets/icons/console.svg";
import { oriWordAtom } from "../store/atoms";

const PlayerTwoInfo = () => {
  // hooks
  const oriWord = useRecoilValue(oriWordAtom);

  return (
    <>
      <div className="flex items-center gap-x-3 mb-8">
        <ConsoleIcon width={45} height={45} />
        <p className="font-medium text-2xl">Player 2</p>
      </div>
      <div className="flex flex-col gap-y-4 mb-8">
        <p className="font-semibold">Word progress</p>
        <div className="flex items-center gap-x-1">
          {oriWord.split("").map((_, i) => (
            <div
              key={i}
              className="border-2 bg-white border-slate-200 w-16 h-16 p-2 text-center text-2xl outline-none rounded-lg font-bold uppercase"
            ></div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="font-semibold">Tries left</p>
        <div className="flex items-center gap-x-1">
          {Array(6).fill(0).map((_, i) => (
            <div
              key={i}
              className="border-2 bg-white border-slate-200 w-16 h-16 p-2 text-center text-2xl outline-none rounded-lg font-bold uppercase"
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PlayerTwoInfo;
