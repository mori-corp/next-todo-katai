import { useEffect, useState } from "react";
import { atom, useSetRecoilState } from "recoil";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// ユーザ認証を監視するための関数
// export const useAuth = () => {
//   const [isLoading, setIsLoading] = useState(true);
//   const setUser = useSetRecoilState(userState);

//   useEffect(() => {
//     return onAuthStateChanged(auth, (user) => {
//       setUser(user);
//       setIsLoading(false);
//     });
//   }, [setUser]);

//   return isLoading;
// };

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
  default: { uid: null, statedEmail: null },
  dangerouslyAllowMutability: true,
  effects_UNSTABLE: [persistAtom],
});
