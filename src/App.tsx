import { useEffect, useRef, useState } from "react";
import { WORDS } from "./constants";

function App() {
    // states
    const [wordLen, setWordLen] = useState(5);
    const [curRowNum, setCurRowNum] = useState(0);
    const [curRow, setCurRow] = useState<null | HTMLInputElement>(null);
    const [typedWord, setTypedWord] = useState("");
    const [oriWord, setOriWord] = useState("");

    // hooks
    const parentRef = useRef<null | HTMLDivElement>(null);

    // functions
    function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
        const nextSibling = e.target.nextSibling as HTMLInputElement;
        setTypedWord((prev) => prev + e.target.value);
        if (nextSibling === null) return;
        nextSibling.focus();
    }

    function handleSetCurRow() {
        if (parentRef && parentRef.current) {
            let childrens = parentRef.current.children[curRowNum];
            if (childrens === undefined) return;
            (childrens.children[0] as HTMLInputElement).focus();
            setCurRow(childrens.children[0] as HTMLInputElement);
        }
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        const code = e.code;
        if (code === "Enter") {
            setCurRowNum((prev) => prev + 1);
            checkForCorrectness();
        }
    }

    function checkForCorrectness() {
        // make two objs
        const freqObj: { [key: string]: any } = {};
        const posObj: { [key: string]: any } = {};

        for (let i = 0; i < oriWord.length; i++) {
            if (freqObj[oriWord[i]] !== undefined) {
                freqObj[oriWord[i]] += 1;
            } else {
                freqObj[oriWord[i]] = 0;
            }
            posObj[i] = oriWord[i];
        }

        console.log(freqObj, posObj);
    }

    // lifecycles
    useEffect(() => {
        handleSetCurRow();
    }, [curRowNum]);

    useEffect(() => {
        setOriWord(
            WORDS[
                Math.floor(Math.random() * (WORDS.length - 0 + 1) + 0)
            ].toLowerCase()
        );
    }, []);

    console.log(curRow, typedWord, oriWord);

    return (
        <main className="h-screen w-full bg-slate-100">
            <section className="flex w-full h-[65%]">
                <div className="w-96 bg-red-300"></div>
                <div className="flex-1 flex items-center justify-center">
                    <div
                        ref={parentRef}
                        className="max-w-sm flex flex-col items-center gap-y-4"
                    >
                        {Array(6)
                            .fill(0)
                            .map((_, index) => (
                                <div
                                    className="flex items-center"
                                    key={index}
                                    id={index.toString()}
                                >
                                    {Array(wordLen)
                                        .fill(0)
                                        .map((_, i) => (
                                            <input
                                                onChange={handleOnChange}
                                                type="text"
                                                key={i}
                                                className="border w-16 h-16 p-2 text-center text-2xl outline-none"
                                                maxLength={1}
                                                onKeyUp={
                                                    i === wordLen - 1
                                                        ? handleKeyUp
                                                        : undefined
                                                }
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
