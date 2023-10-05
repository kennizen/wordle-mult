import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loseConditionAtom, winConditionAtom, winTimeAtom } from "../store/atoms";

const SECONDS_START = 59;

interface IProps {
  start: number;
}

const CountdownTimer = ({ start }: IProps) => {
  // states
  const [minutes, setMinutes] = useState(start);
  const [seconds, setSeconds] = useState(0);
  const [loseCondition, setLoseCondition] = useRecoilState(loseConditionAtom);
  const setWinTime = useSetRecoilState(winTimeAtom);

  // hooks
  const time = useRef<number>(Date.now());
  const updatedTime = useRef<number>();
  const winCondition = useRecoilValue(winConditionAtom);

  // consts
  let requestTimer = useRef<number>(-1);

  // function for the countdown timer
  function showTimer() {
    updatedTime.current = Date.now();

    if (updatedTime.current - time.current >= 1000) {
      setSeconds((prev) => {
        if (prev <= 0) return SECONDS_START;
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
      setWinTime(`${start - minutes}:${60 - seconds}`);
      cancelAnimationFrame(requestTimer.current);
      setMinutes(0);
      setSeconds(0);
    }
  }, [winCondition]);

  useEffect(() => {
    if (seconds === SECONDS_START) {
      setMinutes((prev) => {
        if (prev < 0) return 0;
        return prev - 1;
      });
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes < 0) {
      setLoseCondition(true);
      setSeconds(0);
      cancelAnimationFrame(requestTimer.current);
    }
  }, [minutes]);

  useEffect(() => {
    if (loseCondition) {
      cancelAnimationFrame(requestTimer.current);
      setMinutes(0);
      setSeconds(0);
    }
  }, [loseCondition]);

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
