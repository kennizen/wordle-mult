import { useEffect, useRef, useState } from "react";
import { WORDS } from "./constants";

function App() {
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
    function handleOnChange(e: KeyboardEvent) {
        console.log(e.key);

        if (e.key === "Enter" && isLast) {
            setCurRowNum((prev) => prev + 1);
            checkForCorrectness();
            setIsLast(false);
            return;
        }

        if (e.key === "Backspace" && curRow !== null) {
            const prevSibling = curRow.previousSibling;
            if (prevSibling === null) return;

            console.log(prevSibling);

            if (isLast) {
                curRow.value = "";
                setIsLast(false);
            } else {
                (prevSibling as HTMLInputElement).value = "";
                setCurRow(prevSibling as HTMLInputElement);
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

        if (nextSibling === null) {
            setIsLast(true);
            return;
        }

        setCurRow(nextSibling as HTMLInputElement);
        console.log(e.key);
    }

    function handleSetCurRow() {
        if (parentRef && parentRef.current) {
            let childrens = parentRef.current.children[curRowNum];
            if (childrens === undefined) return;
            setCurRow(childrens.children[0] as HTMLInputElement);
        }
    }

    function checkForCorrectness() {
        // make two objs
        const freqObj: { [key: string]: any } = {};
        const posObj: { [key: string]: any } = {};
        let typedWord = "";

        for (let i = 0; i < inuputSet.length; i++) {
            typedWord += inuputSet[i].value.toLowerCase();
        }

        console.log({ typedWord });

        for (let i = 0; i < oriWord.length; i++) {
            if (freqObj[oriWord[i]] !== undefined) {
                freqObj[oriWord[i]] += 1;
            } else {
                freqObj[oriWord[i]] = 1;
            }
            posObj[i] = oriWord[i];
        }

        for (let i = 0; i < typedWord.length; i++) {
            if (freqObj[typedWord[i]] !== undefined && freqObj[typedWord[i]] > 0) {
                freqObj[typedWord[i]] -= 1;
                if (posObj[i] === typedWord[i]) {
                    inuputSet[i].classList.add("bg-green-300");
                } else {
                    inuputSet[i].classList.add("bg-amber-300");
                }
            } else {
                inuputSet[i].classList.add("bg-gray-300");
            }
        }

        setInputSet([]);

        console.log(freqObj, posObj);
    }

    // lifecycles
    useEffect(() => {
        handleSetCurRow();
    }, [curRowNum, wordLen]);

    useEffect(() => {
        const word = WORDS[Math.floor(Math.random() * (WORDS.length - 0 + 1) + 0)].toLowerCase();
        setOriWord(word);
        setWordLen(word.length);
    }, []);

    useEffect(() => {
        document.addEventListener("keyup", handleOnChange);
        return () => {
            document.removeEventListener("keyup", handleOnChange);
        };
    }, [curRow, isLast]);

    console.log(curRow, inuputSet, oriWord);

    return (
        <main className="h-screen w-full bg-slate-100">
            <section className="flex w-full h-[65%]">
                <div className="w-96 bg-red-300"></div>
                <div className="flex-1 flex items-center justify-center">
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
                                                className="border w-16 h-16 p-2 text-center text-2xl outline-none rounded-lg"
                                                maxLength={1}
                                                readOnly
                                            />
                                        ))}
                                </div>
                            ))}
                    </div>
                </div>
                <div className="w-96 bg-red-300"></div>
            </section>
            <section></section>
        </main>
    );
}

export default App;
