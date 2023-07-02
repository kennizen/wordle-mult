import Lottie from "lottie-react";
import confettiAnimation from "../assets/animation/66948-confetti.json";
import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { winConditionAtom } from "../store/atoms";

const Confetti = () => {
  // states
  const [playAgain, setPlayAgain] = useState(false);

  // hooks
  const navigate = useNavigate();
  const setWinCondition = useSetRecoilState(winConditionAtom);

  // functions
  function handlePlayAgain() {
    setPlayAgain(false);
    setWinCondition(false);
    navigate("/", { replace: true });
  }

  return (
    <div className="fixed w-full h-screen bg-transparent top-0 left-0 flex flex-col items-center">
      <div className="w-[35rem] mx-auto">
        <Lottie
          animationData={confettiAnimation}
          loop={false}
          onComplete={() => setPlayAgain(true)}
        />
      </div>
      {playAgain && (
        <Modal>
          <div className="flex flex-col p-4 gap-y-6">
            <p className="font-semibold text-xl flex items-center">
              Your time - <span className="text-amber-500 text-3xl">10:60 min</span>
            </p>
            <div className="flex items-center justify-end gap-x-4">
              <button
                onClick={handlePlayAgain}
                className="px-4 py-1 bg-slate-200 rounded-md hover:bg-slate-300"
              >
                Play again
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Confetti;
