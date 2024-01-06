import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loseConditionAtom, winConditionAtom, winTimeAtom } from "../store/atoms";

interface IProps {
  startSeconds: number;
}

const CountdownTimer = ({ startSeconds }: IProps) => {
  // states
  const [seconds, setSeconds] = useState(startSeconds);
  const [loseCondition, setLoseCondition] = useRecoilState(loseConditionAtom);
  const setWinTime = useSetRecoilState(winTimeAtom);

  // hooks
  const time = useRef<number>(Date.now());
  const updatedTime = useRef<number>();
  const winCondition = useRecoilValue(winConditionAtom);

  // consts
  let requestTimer = useRef<number>(-1);

  /**
   * function to calculate the time in h:m:s
   */
  function generateTimeString(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes < 10 ? "0" + minutes : minutes}:${
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds
    }`;
  }

  // function for the countdown timer
  function showTimer() {
    updatedTime.current = Date.now();

    if (updatedTime.current - time.current >= 1000) {
      setSeconds((prev) => {
        if (prev <= 0) {
          cancelAnimationFrame(requestTimer.current);
          return 0;
        }
        return prev - 1;
      });
      time.current = Date.now();
    }

    requestTimer.current = requestAnimationFrame(showTimer);
  }

  // lifecycles
  useEffect(() => {
    requestTimer.current = requestAnimationFrame(showTimer);
    return () => {
      cancelAnimationFrame(requestTimer.current);
    };
  }, []);

  useEffect(() => {
    if (winCondition) {
      setWinTime(generateTimeString(startSeconds - seconds));
      cancelAnimationFrame(requestTimer.current);
    }
  }, [winCondition, seconds]);

  useEffect(() => {
    if (loseCondition) {
      cancelAnimationFrame(requestTimer.current);
    }
  }, [loseCondition]);

  useEffect(() => {
    if (seconds <= 0) setLoseCondition(true);
  }, [seconds]);

  return (
    <div>
      <p className="font-semibold text-lg text-gray-600">Time Left</p>
      <p className="text-center font-bold text-xl text-gray-700">{generateTimeString(seconds)}</p>
    </div>
  );
};

export default CountdownTimer;
