// タスクの編集ページ

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { todoState } from "../../components/atoms";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import InputField from "../../components/InputFeild";
import Textarea from "../../components/Textarea";
import StatusSelector from "../../components/StatusSelector";
import { userState } from "../../components/atoms";

export default function Edit() {
  const statedTodo = useRecoilValue(todoState);
  const [updatedTodo, setUpdatedTodo] = useState(statedTodo.title);
  const [updatedDetail, setUpdatedDetail] = useState(statedTodo.detail);
  const [updatedStatus, setUpdatedStatus] = useState(statedTodo.status);
  const { uid } = useRecoilValue(userState);
  const router = useRouter();

  // もしログインしていない状態であれば、ログインページへ遷移
  useEffect(() => {
    if (uid === null) {
      router.push("/login");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 編集ボタンをクリックした時の関数
  const handleEdit = (id) => {
    // firestoreのドキュメントの参照
    const docRef = doc(db, "todos", id);

    // 編集内容を定義
    const payload = {
      title: updatedTodo,
      detail: updatedDetail,
      status: updatedStatus,
      timeUpdated: serverTimestamp(),
    };

    //変更のあったプロパティのみ、ドキュメントをアップデート
    updateDoc(docRef, payload);

    // /todosへ遷移
    router.push("/todos");
  };

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-xl mb-2">編集ページ</h1>
        <hr />
        <div className="mt-2">
          {/* 新しいTODOの入力フォーム */}
          <InputField
            todo={updatedTodo}
            label={"タイトル"}
            onSetTodo={setUpdatedTodo}
            placeholder={"TODOを編集"}
          />
        </div>

        {/* 新しいTODOの詳細入力フォーム */}
        <Textarea detail={updatedDetail} onSetDetail={setUpdatedDetail} />

        {/* ステータス選択欄 */}
        <div className="flex items-center mt-2 mb-8">
          <StatusSelector
            updatedStatus={updatedStatus}
            onSetUpdatedStatus={setUpdatedStatus}
          />
        </div>

        {/* 更新ボタン */}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            handleEdit(statedTodo.id);
          }}
        >
          更新
        </button>

        {/* 戻るボタン */}
        <Link href="/todos/detail">
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
