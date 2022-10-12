// タスクの新規追加ページ

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { Header } from "../../components/Header";
import InputField from "../../components/InputFeild";
import Textarea from "../../components/Textarea";
import { useRecoilValue } from "recoil";
import { userState } from "../../components/atoms";

export default function Create() {
  const [todo, setTodo] = useState("");
  const [detail, setDetail] = useState("");
  const router = useRouter();
  const [isCreatingTodo, setIsCreatingTodo] = useState();
  const { uid } = useRecoilValue(userState);

  // もしログインしていない状態であれば、ログインページへ遷移
  useEffect(() => {
    if (uid === null) {
      router.push("/login");
    }
  }, []);

  // 追加ボタンをクリックした時の関数
  const handleAddTodo = async () => {
    // isCreatingTodoがtrueの間は、todo作成中に「todoを作成中 ...」の文言を表示
    setIsCreatingTodo(true);

    if (todo !== "") {
      // firestoreのコレクションを参照
      const collectionRef = collection(db, "todos");
      // 追加したい内容を定義
      const payload = {
        title: todo,
        detail: detail,
        status: "waiting",
        timeAdded: serverTimestamp(),
        timeUpdated: serverTimestamp(),
      };
      // 追加（document_idは、firebaseが自動生成）
      await addDoc(collectionRef, payload);

      // 追加後、todo一覧画面へ遷移
      router.push("/todos");

      setIsCreatingTodo(false);
    }
  };

  return (
    <>
      <Header />
      <div className="p-6">
        {/* 新しいTODOのタイトル入力フォーム */}
        <InputField
          todo={todo}
          label={"タイトル"}
          onSetTodo={setTodo}
          placeholder={"新しいTODOを追加"}
        />

        {/* 新しいTODOの詳細入力フォーム */}
        <Textarea detail={detail} onSetDetail={setDetail} />

        {/* 新しいTODOを作成中の表示 */}
        {isCreatingTodo && (
          <div className="text-sm mb-2 text-slate-300">
            新規TODOを作成中 ...
          </div>
        )}

        {/* 追加ボタン */}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleAddTodo}
        >
          追加
        </button>

        {/* 戻るボタン */}
        <Link href="/todos">
          <button
            type="button"
            className="px-5 py-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            戻る
          </button>
        </Link>
      </div>
    </>
  );
}
