// タスクの新規追加ページ

import { useState } from "react";
import { uid } from "uid";
import Link from "next/link";

export default function Create() {
  const [todo, setTodo] = useState("");
  const [detail, setDetail] = useState("");
  const [todos, setTodos] = useState([]);

  // 追加ボタンを押すと、配列（todos）にタスクを追加
  const handleAddTodo = () => {
    const uuid = uid();
    if (todo !== "") {
      setTodos([
        ...todos,
        {
          id: uuid,
          todo: todo,
          detail: detail,
        },
      ]);
      console.log(todos);
    }
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1>新しいTodoを作成</h1>
        <hr />
      </div>
      <div>
        {/* 新しいTODOの入力フォーム */}
        <label
          htmlFor="todoInput"
          className="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-300"
        >
          New Todo
        </label>

        <input
          type="text"
          id="todoInput"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="新しいTODOを追加"
          required
          value={todo}
          onChange={(e) => {
            setTodo(e.target.value);
          }}
        />
      </div>

      {/* 新しいTODOの詳細入力フォーム */}
      <div>
        <label
          htmlFor="detail"
          className="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-300"
        >
          Detail
        </label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          id="detail"
          name="detail"
          cols="30"
          rows="3"
          placeholder="ここに詳細を入力"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value);
          }}
        />
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={handleAddTodo}
        >
          追加
        </button>

        <Link href="/todos">
          <button
            type="button"
            className="px-5 py-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            戻る
          </button>
        </Link>
      </div>
    </div>
  );
}
