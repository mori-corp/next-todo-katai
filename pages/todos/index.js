import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilState } from "recoil";
import { todoState } from "../../components/atoms";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";

export default function Todos() {
  const [todos, setTodos] = useState([{ title: "Loading ...", id: "initial" }]);
  const [statedTodo, setStatedTodo] = useRecoilState(todoState);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

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
    // Recoilへset
    setStatedTodo({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
      status: todo.status,
      // timestampはオブジェクト形式でリターンされる{seconds: 1664761208, nanoseconds: 734000000}
      // recoilにstring型として格納
      time: String(todo.timestamp.toDate()), //Mon Oct 03 2022 10:40:08 GMT+0900 (日本標準時)形式で格納
    });

    router.push("/todos/detail");
  };

  // ソート機能
  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        // optionで"未完了"が選択された場合
        case "waiting":
          setFilteredTodos(todos.filter((todo) => todo.status === "waiting"));
          break;
        // optionで"進行中"が選択された場合
        case "working":
          setFilteredTodos(todos.filter((todo) => todo.status === "working"));
          break;
        // optionで"完了"が選択された場合
        case "completed":
          setFilteredTodos(todos.filter((todo) => todo.status === "completed"));
          break;
        // optionで"すべて"が選択された場合
        case "all":
          setFilteredTodos(todos);
          break;
        // ここまで
        default:
          setFilteredTodos(todos);
      }
    };
    // 関数の呼び出し
    filteringTodos();
  }, [filter, todos]);

  return (
    <>
      <Header />
      <div className="p-6">
        <div className="flex items-center mb-4">
          <span>ソート：</span>
          <select
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80px] h-[30px] p-1 mx-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">すべて</option>
            <option value="waiting">未着手</option>
            <option value="working">進行中</option>
            <option value="completed">完了</option>
          </select>
        </div>

        {/* todo field */}
        <div>
          <ul>
            {/* firebaseに格納されているtodosを展開 */}
            {filteredTodos.map((todo) => (
              <li
                key={todo.id}
                className="flex bg-slate-800 hover:bg-slate-700 justify-between items-center p-2 mb-4 min-w-[380px] max-w-[580px] rounded-sm"
              >
                <span>{todo.title}</span>
                <div className="flex items-center">
                  {/* ステータスの表示 */}
                  <span className="rounded-lg bg-[#111827] text-sm px-3 py-1.5 mr-2">
                    {todo.status === "waiting" && "未着手"}
                    {todo.status === "working" && "進行中"}
                    {todo.status === "completed" && "完了"}
                  </span>

                  {/* 詳細ボタン */}
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
    </>
  );
}
