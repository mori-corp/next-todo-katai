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
    status: "",
    timeUpdated: null,
  },
});

export const userState = atom({
  key: "user",
  default: { uid: null, statedEmail: null },
  // dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom],
});
