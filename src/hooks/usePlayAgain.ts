import { useSetRecoilState } from "recoil";
import { beginGameAtom, loseConditionAtom, winConditionAtom, winTimeAtom } from "../store/atoms";
import { useNavigate } from "react-router-dom";

export const usePlayAgain = () => {
  // states
  const setWinCondition = useSetRecoilState(winConditionAtom);
  const setWinTime = useSetRecoilState(winTimeAtom);
  const setLoseCondition = useSetRecoilState(loseConditionAtom);
  const setBeginGame = useSetRecoilState(beginGameAtom);
  const navigate = useNavigate();

  // funtion
  function handlePlayAgain() {
    setWinCondition(false);
    setWinTime("");
    setLoseCondition(false);
    setBeginGame(false);
    navigate("/", { replace: true });
  }

  return { handlePlayAgain };
};

export default usePlayAgain;
