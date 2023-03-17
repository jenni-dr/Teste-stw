import { atom } from "recoil";

type TokenAtomType = string | null;
export const TokenAtom = atom({
  key: "TokenAtom",
  default: null as TokenAtomType,
});
