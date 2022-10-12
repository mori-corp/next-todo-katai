import React from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { userState } from "../components/atoms";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router/";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInUser, setSignInUser] = useRecoilState(userState);
  const { uid } = useRecoilValue(userState);
  const router = useRouter();

  // もしログイン状態であれば、/todosへ遷移させる
  useEffect(() => {
    if (uid !== null) {
      router.push("/todos");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ユーザーのログイン
   */
  const handleLogin = (event) => {
    event.preventDefault();
    // emailとpasswordで登録
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // recoildへ、uidと、email情報をセット
        setSignInUser({ uid: user.user.uid, statedEmail: user.user.email });
        // todos へ遷移
        router.push("/todos");
      })
      .catch((error) => {
        alert("ログインに失敗しました。");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {auth.user && "loggend in"}
      <form
        className="flex flex-col items-center justify-center bg-slate-800 p-8 rounded w-80"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl mb-4 text-center">ログインページ</h1>
        <div className="mb-4 w-full">
          <label htmlFor="email">メールアドレス</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            required
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="mb-2 w-full">
          <label htmlFor="password">パスワード</label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            id="password"
            name="password"
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 m-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            ログイン
          </button>
        </div>
        <Link href="/">
          <span className="text-xs text-slate-200 hover:cursor-pointer">
            新規登録はこちら
          </span>
        </Link>
      </form>
    </div>
  );
}
