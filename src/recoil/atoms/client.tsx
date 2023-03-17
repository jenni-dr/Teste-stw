import { atom } from "recoil";

type ClientAtomType = {
  uuid: string;
} | null;
export const ClientAtom = atom({
  key: "ClientAtom",
  default: null as ClientAtomType,
});
