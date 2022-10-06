// TODO一覧ページ

import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilState } from "recoil";
import { todoState } from "../../components/atoms";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import TodoRows from "../../components/TodoRows";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [statedTodo, setStatedTodo] = useRecoilState(todoState);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // firestoreの"todos" collectionの、各ドキュメントを読み込む
  useEffect(() => {
    setIsLoading(true);

    // firestoreから取得したドキュメント一覧を、追加時間の降順に並べ替え
    const q = query(collection(db, "todos"), orderBy("timeAdded", "desc"));

    // 並べ替えたドキュメントをを展開
    const unsub = onSnapshot(q, (snapshot) => {
      // todosの配列にセット。ドキュメントのid番号を割り振り
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setIsLoading(false);
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
      // 追加日時をrecoilにオブジェクト形式で格納{seconds: 1664761208, nanoseconds: 734000000}
      timeAdded: todo.timeAdded,
      // 最終更新をrecoilにstring型として格納：Mon Oct 03 2022 10:40:08 GMT+0900 (日本標準時)形式
      timeUpdated: String(todo.timeUpdated.toDate()),
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
          {/* ソートセレクタ */}
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

        {/* todoの一覧表示 */}
        <div>
          <ul>
            {/* firebaseに格納されているデータを展開 */}
            {/* todoを読み込んでいる最中は、別表示 */}
            {isLoading ? (
              <div>TODOを読み込んでいます ...</div>
            ) : (
              // 読み込まれた後に、todo一覧を表示
              filteredTodos.map((todo) => (
                <TodoRows
                  key={todo.id}
                  todo={todo}
                  onHandleDetailButtonClick={handleDetailButtonClick}
                />
              ))
            )}
          </ul>
        </div>
      </div>
    </>
  );
}
