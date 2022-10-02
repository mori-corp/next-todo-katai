import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilState } from "recoil";
import { todoState } from "../../components/atoms";
import { useRouter } from "next/router";

export default function Todos() {
  const [todos, setTodos] = useState([{ title: "Loading ...", id: "initial" }]);

  const [statedTodo, setStatedTodo] = useRecoilState(todoState);

  const router = useRouter();

  // firestoreの"todos" collectionの、各ドキュメントを読み込む
  useEffect(() => {
    // コレクション"todos"から、各ドキュメント（各todo）を展開
    const unsub = onSnapshot(collection(db, "todos"), (snapshot) => {
      // todosの配列にセット。ドキュメントのid番号を割り振り
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
    return unsub;
  }, []);

  // 詳細ボタンをクリックした時の関数
  const handleDetailButtonClick = (todo) => {
    // set
    setStatedTodo({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
    });

    router.push("/todos/detail");
  };

  return (
    <div className="p-6">
      <div className="flex mb-4">
        <h1 className="text-xl mr-3">Todos page</h1>
        <Link href="/todos/create">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            追加
          </button>
        </Link>
      </div>

      {/* todo field */}
      <div>
        <ul>
          {/* firebaseに格納されているtodosを展開 */}
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex bg-slate-800 hover:bg-slate-700 justify-between items-center p-2 mb-4 min-w-[380px] max-w-[580px]"
            >
              <span>{todo.title}</span>
              <div className="flex items-center">
                {/* ステータスのセレクタ */}
                <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[110px] h-[30px] p-1 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option value="waiting">Waiting</option>
                  <option value="working">Working</option>
                  <option value="completed">Completed</option>
                </select>

                {/* 詳細ボタン */}
                {/* <Link href="/todos/detail"> */}
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  onClick={() => {
                    handleDetailButtonClick(todo);
                  }}
                >
                  詳細
                </button>
                {/* </Link> */}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
