import { useRecoilState, useRecoilValue } from "recoil";
import { WORDS } from "../constants/5LetterWords";
import { useEffect, useRef, useState } from "react";
import {
  inputSetAtom,
  oriWordAtom,
  virtualKeyboardKeyAtom,
  virtualKeyboardMapAtom,
  winConditionAtom,
} from "../store/atoms";

const Board = () => {
  // states
  const [wordLen, setWordLen] = useState(0);
  const [curRowNum, setCurRowNum] = useState(0);
  const [curInput, setCurInput] = useState<null | HTMLInputElement>(null);
  const [inputSet, setInputSet] = useRecoilState(inputSetAtom);
  const [oriWord, setOriWord] = useRecoilState(oriWordAtom);
  const [isLast, setIsLast] = useState(false);

  // hooks
  const parentRef = useRef<null | HTMLDivElement>(null);
  const virtualKeyboardKey = useRecoilValue(virtualKeyboardKeyAtom);
  const virtualKeyboardMap = useRecoilValue(virtualKeyboardMapAtom);
  const [winCondition, setWinCondition] = useRecoilState(winConditionAtom);

  // functions
  function handleOnKeyUp(e: KeyboardEvent | string) {
    if (winCondition) return;

    let key = "";

    if (typeof e === "string") key = e;
    else key = e.key;

    console.log(key);

    if (key === "Enter" && isLast) {
      setCurRowNum((prev) => prev + 1);
      let typedWord = "";

      for (let i = 0; i < inputSet.length; i++) {
        typedWord += inputSet[i].value.toLowerCase();
      }

      if (typedWord === oriWord) handleWinCondition();
      else checkForCorrectness(typedWord);

      setIsLast(false);
      return;
    } else if (key === "Backspace" && curInput !== null) {
      const prevSibling = curInput.previousSibling as HTMLInputElement | null;

      if (prevSibling === null) return;

      if (isLast) {
        curInput.value = "";
        curInput.classList.remove("animate-scale-in-out");
        curInput.classList.remove("border-slate-400");
        setIsLast(false);
      } else {
        prevSibling.value = "";
        prevSibling.classList.remove("animate-scale-in-out");
        prevSibling.classList.remove("border-slate-400");
        setCurInput(prevSibling);
      }

      const poppedInputSet = [...inputSet];
      poppedInputSet.pop();
      setInputSet(poppedInputSet);

      return;
    }

    if (key === "") return;
    else if (key.length > 1) return;
    else if (!/^[A-Za-z]+$/.test(key)) return;
    else if (curInput === null) return;
    else if (isLast) return;

    const nextSibling = curInput.nextSibling;

    setInputSet((prev) => [...prev, curInput]);
    curInput.value = key;
    curInput.classList.add("animate-scale-in-out");
    curInput.classList.add("border-slate-400");

    if (nextSibling === null) {
      setIsLast(true);
      return;
    }

    setCurInput(nextSibling as HTMLInputElement);
  }

  function handleSetCurRow() {
    if (parentRef && parentRef.current) {
      let childrens = parentRef.current.children[curRowNum];
      if (childrens === undefined) return;
      if (childrens.children[0] === undefined) return;
      setCurInput(childrens.children[0] as HTMLInputElement);
    }
  }

  function checkForCorrectness(typedWord: string) {
    // make two objs
    const freqObj: { [key: string]: any } = {};
    const posObj: { [key: string]: any } = {};

    console.log({ typedWord });

    for (let i = 0; i < oriWord.length; i++) {
      if (freqObj[oriWord[i]] !== undefined) freqObj[oriWord[i]] += 1;
      else freqObj[oriWord[i]] = 1;
      posObj[i] = oriWord[i];
    }

    for (let i = 0; i < typedWord.length; i++) {
      setTimeout(() => {
        virtualKeyboardMap[inputSet[i].value].classList.remove("bg-slate-300");
        virtualKeyboardMap[inputSet[i].value].classList.add("text-white");

        if (freqObj[typedWord[i]] !== undefined && freqObj[typedWord[i]] > 0) {
          freqObj[typedWord[i]] -= 1;

          if (posObj[i] === typedWord[i]) {
            inputSet[i].classList.add("bg-green-500");
            virtualKeyboardMap[inputSet[i].value].classList.add("bg-green-500");
          } else {
            inputSet[i].classList.add("bg-yellow-500");
            virtualKeyboardMap[inputSet[i].value].classList.add("bg-yellow-500");
          }
        } else {
          inputSet[i].classList.add("bg-slate-500");
          virtualKeyboardMap[inputSet[i].value].classList.add("bg-slate-500");
        }

        inputSet[i].classList.add("border-none");
        inputSet[i].classList.add("text-white");
      }, i * 75);
    }

    setInputSet([]);
  }

  function handleWinCondition() {
    for (let i = 0; i < inputSet.length; i++) {
      inputSet[i].classList.remove("animate-scale-in-out");

      setTimeout(() => {
        inputSet[i].classList.add("animate-scale-in-out");
        inputSet[i].classList.add("bg-green-500");
        inputSet[i].classList.add("border-none");
        inputSet[i].classList.add("text-white");
        virtualKeyboardMap[inputSet[i].value].classList.remove("bg-slate-300");
        virtualKeyboardMap[inputSet[i].value].classList.add("bg-green-500");
        virtualKeyboardMap[inputSet[i].value].classList.add("text-white");

        if (i >= inputSet.length - 1) {
          console.log("won");
          setWinCondition(true);
          setInputSet([]);
        }
      }, i * 100);
    }
  }

  // lifecycles
  useEffect(() => {
    const word = WORDS[Math.floor(Math.random() * (WORDS.length - 0 + 1) + 0)].toLowerCase();
    setOriWord(word);
    setWordLen(word.length);
  }, []);

  useEffect(() => {
    handleSetCurRow();
  }, [curRowNum, wordLen]);

  useEffect(() => {
    if (Object.keys(virtualKeyboardKey).length <= 0) return;
    handleOnKeyUp(virtualKeyboardKey.val);
  }, [virtualKeyboardKey]);

  useEffect(() => {
    document.addEventListener("keyup", handleOnKeyUp);
    return () => {
      document.removeEventListener("keyup", handleOnKeyUp);
    };
  }, [curInput, isLast, winCondition]);

  console.log({ curInput, inputSet, oriWord, virtualKeyboardMap, virtualKeyboardKey });

  return (
    <div ref={parentRef} className="max-w-sm flex flex-col items-center gap-y-2">
      {Array(6)
        .fill(0)
        .map((_, index) => (
          <div className="flex items-center gap-x-1" key={index}>
            {Array(wordLen)
              .fill(0)
              .map((_, i) => (
                <input
                  type="text"
                  key={i}
                  className="border-2 border-slate-200 w-16 h-16 p-2 text-center text-2xl outline-none rounded-lg font-bold uppercase"
                  maxLength={1}
                  readOnly
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export default Board;
