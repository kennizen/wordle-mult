import { useRecoilValue } from "recoil";
import Modal from "./Modal";
import { oriWordAtom } from "../store/atoms";
import usePlayAgain from "../hooks/usePlayAgain";

const LoseScreen = () => {
  // hooks
  const oriWord = useRecoilValue(oriWordAtom);
  const { handlePlayAgain } = usePlayAgain();

  return (
    <Modal open>
      <div className="flex flex-col p-4 gap-y-6">
        <p className="font-semibold text-3xl flex items-center">You lost :(</p>
        <p className="font-semibold text-xl flex items-center">
          The word was: <span className="ml-1 text-red-500">{oriWord}</span>
        </p>
        <div className="flex items-center justify-end gap-x-4">
          <button onClick={handlePlayAgain} className="px-4 py-1 bg-slate-200 rounded-md hover:bg-slate-300">
            Play again
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default LoseScreen;
