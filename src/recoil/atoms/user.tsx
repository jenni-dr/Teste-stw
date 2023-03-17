import { atom } from "recoil";

export type UserAtomType = {
  id: string;
  role: string;
  permissions: null;
  sub: any;
} | null;
export const UserAtom = atom({
  key: "UserAtom",
  default: null as UserAtomType,
});
