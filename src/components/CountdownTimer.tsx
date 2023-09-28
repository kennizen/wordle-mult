import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { loseConditionAtom } from "../store/atoms";

const SECONDS_START = 59;

interface IProps {
  start: number;
}

const CountdownTimer = ({ start }: IProps) => {
  // states
  const [minutes, setMinutes] = useState(start);
  const [seconds, setSeconds] = useState(SECONDS_START);
  const setLoseCondition = useSetRecoilState(loseConditionAtom);

  // hooks
  const time = useRef<number>(new Date().getTime());
  const updatedTime = useRef<number>();

  // consts
  let requestTimer = useRef<number>(-1);

  // function for the countdown timer
  function showTimer() {
    updatedTime.current = new Date().getTime();
    if (updatedTime.current - time.current >= 1000) {
      setSeconds((prev) => {
        if (prev <= 0) {
          return SECONDS_START;
        }
        return prev - 1;
      });
      time.current = new Date().getTime();
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
    if (seconds <= 0) {
      setMinutes((prev) => {
        if (prev < 0) {
          return 0;
        }
        return prev - 1;
      });
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes < 0) {
      setLoseCondition(true);
      cancelAnimationFrame(requestTimer.current);
    }
  }, [minutes]);

  return (
    <div>
      <p className="font-semibold text-lg text-gray-600">Time Left</p>
      <p className="text-center font-bold text-xl text-gray-700">{`${
        minutes <= -1 ? "00" : minutes < 10 ? "0" + minutes : minutes
      }:${seconds < 10 ? "0" + seconds : seconds}`}</p>
    </div>
  );
};

export default CountdownTimer;
