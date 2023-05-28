import KeyboardButton from "./styledComponents/KeyboardButton";
import { ReactComponent as BackspaceIcon } from "../assets/icons/backspace.svg";
import { useSetRecoilState } from "recoil";
import { virtualKeyboardKeyAtom, virtualKeyboardMapAtom } from "../store/atoms";
import { useEffect, useRef } from "react";

const VirtualKeyboard = () => {
    // states
    const setVKeyboardObj = useSetRecoilState(virtualKeyboardMapAtom);
    const setVirtualKeyboardKey = useSetRecoilState(virtualKeyboardKeyAtom);

    // hooks
    const vkeyboardRef = useRef<null | HTMLDivElement>(null);

    // functions
    function handleSetVKeyboard() {
        if (vkeyboardRef === null || vkeyboardRef.current === null) return;
        const childrens = vkeyboardRef.current.children;
        const tmp = {} as any;

        for (let i = 0; i < childrens.length; i++) {
            const key = childrens[i].textContent ?? "";
            tmp[key === "" ? "Backspace" : key] = childrens[i];
        }

        setVKeyboardObj(tmp);
    }

    function handleKeyboardClick(e: React.MouseEvent<HTMLButtonElement>) {
        const val = (e.target as HTMLButtonElement).textContent ?? "";

        if (val === "") setVirtualKeyboardKey({ val: "Backspace" });
        else setVirtualKeyboardKey({ val });
    }

    // lifecycles
    useEffect(() => {
        handleSetVKeyboard();
    }, []);

    return (
        <div
            ref={vkeyboardRef}
            id="virtual-keyboard"
            className="flex gap-2 flex-wrap max-w-[32rem]"
        >
            <KeyboardButton onClick={handleKeyboardClick}>q</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>w</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>e</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>r</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>t</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>y</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>u</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>i</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>o</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>p</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>a</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>s</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>d</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>f</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>g</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>h</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>j</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>k</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>l</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>
                <BackspaceIcon />
            </KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>z</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>x</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>c</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>v</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>b</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>n</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>m</KeyboardButton>
            <KeyboardButton onClick={handleKeyboardClick}>Enter</KeyboardButton>
        </div>
    );
};

export default VirtualKeyboard;
