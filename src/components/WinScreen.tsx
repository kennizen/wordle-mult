import Lottie from "lottie-react";
import confettiAnimation from "../assets/animation/66948-confetti.json";
import { useState } from "react";
import Modal from "./Modal";
import { useRecoilValue } from "recoil";
import { winTimeAtom } from "../store/atoms";
import usePlayAgain from "../hooks/usePlayAgain";

const WinScreen = () => {
  // states
  const [playAgain, setPlayAgain] = useState(false);

  // hooks
  const winTime = useRecoilValue(winTimeAtom);
  const { handlePlayAgain: playAgainFunc } = usePlayAgain();

  // functions
  function handlePlayAgain() {
    setPlayAgain(false);
    playAgainFunc();
  }

  return (
    <div className="fixed w-full h-screen bg-transparent top-0 left-0 flex flex-col items-center">
      <div className="w-[35rem] mx-auto">
        <Lottie animationData={confettiAnimation} loop={false} onComplete={() => setPlayAgain(true)} />
      </div>
      {playAgain && (
        <Modal>
          <div className="flex flex-col p-4 gap-y-6">
            <p className="font-semibold text-xl flex items-center">
              Your time: <span className="text-green-500 text-3xl">&nbsp;{winTime}</span>
            </p>
            <div className="flex items-center justify-end gap-x-4">
              <button onClick={handlePlayAgain} className="px-4 py-1 bg-slate-200 rounded-md hover:bg-slate-300">
                Play again
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default WinScreen;
