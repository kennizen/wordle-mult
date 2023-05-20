import { WORDS } from "../constants/5LetterWords";
import { useEffect, useRef, useState } from "react";

const Board = () => {
    // states
    const [wordLen, setWordLen] = useState(0);
    const [curRowNum, setCurRowNum] = useState(0);
    const [curRow, setCurRow] = useState<null | HTMLInputElement>(null);
    const [inuputSet, setInputSet] = useState<HTMLInputElement[]>([]);
    const [oriWord, setOriWord] = useState("");
    const [isLast, setIsLast] = useState(false);

    // hooks
    const parentRef = useRef<null | HTMLDivElement>(null);

    // functions
    function handleOnKeyUp(e: KeyboardEvent) {
        console.log(e.key);

        if (e.key === "Enter" && isLast) {
            setCurRowNum((prev) => prev + 1);
            let typedWord = "";

            for (let i = 0; i < inuputSet.length; i++) {
                typedWord += inuputSet[i].value.toLowerCase();
            }

            if (typedWord === oriWord) handleWinCondition();
            else checkForCorrectness(typedWord);

            setIsLast(false);
            return;
        }

        if (e.key === "Backspace" && curRow !== null) {
            const prevSibling = curRow.previousSibling as HTMLInputElement | null;

            if (prevSibling === null) return;

            if (isLast) {
                curRow.value = "";
                curRow.classList.remove("animate-scale-in-out");
                setIsLast(false);
            } else {
                prevSibling.value = "";
                prevSibling.classList.remove("animate-scale-in-out");
                setCurRow(prevSibling);
            }

            const poppedInputSet = [...inuputSet];
            poppedInputSet.pop();
            setInputSet(poppedInputSet);

            return;
        }

        if (e.key.length > 1) return;
        if (!/^[A-Za-z]+$/.test(e.key)) return;
        if (curRow === null) return;
        if (isLast) return;

        const nextSibling = curRow.nextSibling;

        setInputSet((prev) => [...prev, curRow]);
        curRow.value = e.key.toUpperCase();
        curRow.classList.add("animate-scale-in-out");

        if (nextSibling === null) {
            setIsLast(true);
            return;
        }

        setCurRow(nextSibling as HTMLInputElement);
    }

    function handleSetCurRow() {
        if (parentRef && parentRef.current) {
            let childrens = parentRef.current.children[curRowNum];
            if (childrens === undefined) return;
            setCurRow(childrens.children[0] as HTMLInputElement);
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
            if (freqObj[typedWord[i]] !== undefined && freqObj[typedWord[i]] > 0) {
                freqObj[typedWord[i]] -= 1;
                if (posObj[i] === typedWord[i]) inuputSet[i].classList.add("bg-green-300");
                else inuputSet[i].classList.add("bg-amber-300");
            } else inuputSet[i].classList.add("bg-gray-300");
        }

        setInputSet([]);

        console.log(freqObj, posObj);
    }

    function handleWinCondition() {
        for (let i = 0; i < inuputSet.length; i++) {
            inuputSet[i].classList.remove("animate-scale-in-out");
            setTimeout(() => {
                inuputSet[i].classList.add("animate-scale-in-out");
                inuputSet[i].classList.add("bg-green-300");
                if (i >= inuputSet.length - 1) console.log("won");
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
        document.addEventListener("keyup", handleOnKeyUp);
        return () => {
            document.removeEventListener("keyup", handleOnKeyUp);
        };
    }, [curRow, isLast]);

    console.log(curRow, inuputSet, oriWord);

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
                                    className="border-2 border-slate-200 w-16 h-16 p-2 text-center text-2xl outline-none rounded-lg del"
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
