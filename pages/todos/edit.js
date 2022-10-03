// 編集ページ

import Link from "next/link";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { todoState } from "../../components/atoms";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";

export default function Edit() {
  const statedTodo = useRecoilValue(todoState);

  const router = useRouter();

  const [updatedTodo, setUpdatedTodo] = useState(statedTodo.title);
  const [updatedDetail, setUpdatedDetail] = useState(statedTodo.detail);

  // 編集ボタンをクリックした時の関数
  const handleEdit = (id) => {
    const docRef = doc(db, "todos", id);
    const payload = { title: updatedTodo, detail: updatedDetail };
    setDoc(docRef, payload);

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
          <label
            htmlFor="todoInput"
            className="block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            タイトル：
          </label>

          <input
            type="text"
            id="todoInput"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="TODOを編集"
            value={updatedTodo}
            onChange={(e) => {
              setUpdatedTodo(e.target.value);
            }}
            required
            autoComplete="off"
          />
        </div>

        {/* 新しいTODOの詳細入力フォーム */}
        <div>
          <label
            htmlFor="detail"
            className="block text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            詳細：
          </label>
          <textarea
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            id="detail"
            name="detail"
            cols="30"
            rows="3"
            placeholder="詳細を入力してください"
            value={updatedDetail}
            onChange={(e) => {
              setUpdatedDetail(e.target.value);
            }}
          />
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              handleEdit(statedTodo.id);
            }}
          >
            更新
          </button>

          <Link href="/todos/detail">
            <button
              type="button"
              className="px-5 py-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              戻る
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
