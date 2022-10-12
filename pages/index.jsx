import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../components/atoms";
import { useRouter } from "next/router";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { uid } = useRecoilValue(userState);
  const [signInUser, setSignInUser] = useRecoilState(userState);

  // もしログイン状態であれば、/todosへ遷移
  useEffect(() => {
    if (uid !== null) {
      router.push("/todos");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * ユーザーの新規登録
   */
  const handleSignUp = (event) => {
    event.preventDefault();

    // email, passwordで新規登録
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // recoilへ、uidとemailをセット
        setSignInUser({ uid: user.user.uid, statedEmail: user.user.email });
        router.push("/todos");
      })
      .catch((error) => alert("登録に失敗しました"));
  };

  return (
    <div>
      <Head>
        <title>next-todo-app</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        {/* <link href="/dist/output.css" rel="stylesheet"></link> */}
      </Head>
      <div className="flex flex-col items-center justify-center h-screen">
        <form
          className="flex flex-col items-center justify-center bg-slate-800 p-8 rounded w-80"
          onSubmit={handleSignUp}
        >
          <h1 className="text-xl mb-4 text-center">新規登録</h1>
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
          <div>
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1.5 m-4 px-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
              登録
            </button>
          </div>
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
