import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useSetRecoilState } from "recoil";
import { beginGameAtom } from "../store/atoms";

const GameStartCountdown = () => {
  // states
  const [shrinkNum, setShrinkNum] = useState(3);
  const setBeginGame = useSetRecoilState(beginGameAtom);

  // functions
  function handleShrinkNum() {
    setShrinkNum((prev) => {
      if (prev <= 0) {
        return 0;
      }
      return prev - 1;
    });
    document.getElementById("shrinkNum")?.classList.remove("animate-num-shrink");
  }

  // lifecycles
  useEffect(() => {
    if (shrinkNum <= 0) {
      setBeginGame(true);
    } else {
      document.getElementById("shrinkNum")?.classList.add("animate-num-shrink");
    }
  }, [shrinkNum]);

  return createPortal(
    <div className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-50 flex flex-col items-center gap-y-8">
      <p className="mt-56 text-white font-semibold text-2xl">Game starts in</p>
      <p id="shrinkNum" className="text-white font-bold text-5xl " onAnimationEnd={handleShrinkNum}>
        {shrinkNum < 1 ? "1" : shrinkNum}
      </p>
    </div>,
    document.body
  );
};

export default GameStartCountdown;
