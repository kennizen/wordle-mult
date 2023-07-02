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
  key: "virtualKeyboardKeyAtom",
  default: {} as { val: string },
});

export const oriWordAtom = atom({
  key: "oriWordAtom",
  default: "",
});

export const winConditionAtom = atom({
  key: "winConditionAtom",
  default: false,
});
