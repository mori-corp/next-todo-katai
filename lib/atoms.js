import { atom, useRecoilValue } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// todoのステート管理
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

// authのステート管理
export const userState = atom({
  key: "user",
  default: null,
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom],
});

export const useUser = () => {
  return useRecoilValue(userState);
};
