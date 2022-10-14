import React from "react";
import Link from "next/link";
import { auth } from "../firebase";
import { useState, useEffect } from "react";
import { userState, useUser } from "../lib/atoms";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { useRouter } from "next/router/";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setAuthUser = useSetRecoilState(userState);
  const router = useRouter();
  const authUser = useUser();

  // ログインしている状態では、/todosへ遷移
  useEffect(() => {
    authUser !== null && router.push("/todos");
  }, []);

  //　ユーザーのログイン
  const handleLogin = (event) => {
    event.preventDefault();

    // emailとpasswordで登録
    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // 認証を感知し、recoilへステータスセット
        onAuthStateChanged(auth, (user) => {
          setAuthUser(user);
        });
        // todos へ遷移
        router.push("/todos");
      })
      .catch((error) => {
        console.log(error);
        alert("ログインに失敗しました。");
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {auth.user && "loggend in"}

      {/* ログインフォーム */}
      <form
        className="flex flex-col items-center justify-center bg-slate-800 p-8 rounded w-80"
        onSubmit={handleLogin}
      >
        <h1 className="text-xl mb-4 text-center">ログインページ</h1>

        {/* メールアドレス入力欄 */}
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

        {/*パスワード入力欄 */}
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

        {/* ログインボタン */}
        <div>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 m-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            ログイン
          </button>
        </div>

        {/* 新規登録へのリンク */}
        <Link href="/">
          <span className="text-xs text-slate-200 hover:cursor-pointer">
            新規登録はこちら
          </span>
        </Link>
      </form>
    </div>
  );
}
