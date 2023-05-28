import { atom } from "recoil";

export const inputSetAtom = atom({
    key: "inputSetAtom",
    default: [] as HTMLInputElement[],
});

export const virtualKeyboardMapAtom = atom({
    key: "virtualKeyboardMapAtom",
    default: {} as { [key: string]: HTMLButtonElement },
});

export const virtualKeyboardKeyAtom = atom({
    key: "virtualKeyboardKey",
    default: {} as { val: string },
});
