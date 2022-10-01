import { atom } from "recoil";

// todo
export const todoState = atom({
  key: "todo",
  default: {
    title: "",
    detail: "",
  },
});
