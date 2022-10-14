import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userState, useUser } from "../lib/atoms";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const authUser = useUser();
  const setAuthUser = useSetRecoilState(userState);

  // ログインしている状態では、/todosへ遷移
  useEffect(() => {
    authUser && router.push("/todos");
  }, []);

  /**
   * ユーザーの新規登録
   */
  const handleSignUp = (event) => {
    event.preventDefault();

    // email, passwordで新規登録
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // 認証を感知し、recoilへuser情報のセット
        onAuthStateChanged(auth, (user) => {
          setAuthUser(user);
        });

        // /todosページへ自動遷移
        router.push("/todos");
      })
      .catch((error) => {
        console.log(error);
        alert("ユーザー登録に失敗しました。");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        {/* フォーム */}
        <form
          className="flex flex-col items-center justify-center bg-slate-800 p-8 rounded w-80"
          onSubmit={handleSignUp}
        >
          <h1 className="text-xl mb-4 text-center">新規登録</h1>

          {/* メールアドレス入力欄 */}
          <div className="mb-4 w-full">
            <label htmlFor="email">メールアドレス</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
              id="email"
              name="email"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          {/* パスワード入力欄 */}
          <div className="mb-2 w-full">
            <label htmlFor="password">パスワード</label>
            <input
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              id="password"
              name="password"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* 登録ボタン */}
          <div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 m-4 px-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              登録
            </button>
          </div>

          {/* ログインページへのリンク */}
          <Link href="/login">
            <span className="text-xs text-slate-200 hover:cursor-pointer">
              既にアカウントをお持ちの方
            </span>
          </Link>
        </form>
      </div>
    </div>
  );
}
