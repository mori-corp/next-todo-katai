import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// todo
export const todoState = atom({
  key: "todo",
  default: {
    id: "",
    title: "",
    detail: "",
    time: {},
  },
});
