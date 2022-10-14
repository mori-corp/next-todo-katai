// TODO一覧ページ

import { useState, useEffect } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../lib/auth";
import { todoState } from "../../lib/auth";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";
import TodoRows from "../../components/TodoRows";
import AddTodoButton from "../../components/AddTodoButton";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [statedTodo, setStatedTodo] = useRecoilState(todoState);
  const [filter, setFilter] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const { uid } = useRecoilValue(userState);

  const router = useRouter();

  // firestoreの"todos" collectionの、各ドキュメントを読み込む
  useEffect(() => {
    !uid && router.replace("/login");
    setFetching(true);

    // firestoreから取得したドキュメント一覧を、追加時間の降順に並べ替え
    const q = query(collection(db, "todos"), orderBy("timeAdded", "desc"));

    // 並べ替えたドキュメントを展開
    const unsub = onSnapshot(q, (snapshot) => {
      // todosの配列にセット。ドキュメントのid番号を割り振り
      setTodos(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setFetching(false);
    });
    return unsub;
  }, []);

  // 詳細ボタンをクリックした時の関数
  const handleDetailButtonClick = (todo) => {
    // Recoilへセット
    setStatedTodo({
      id: todo.id,
      title: todo.title,
      detail: todo.detail,
      status: todo.status,
      // firestoreに格納してあるtimeUpdated（最終更新日時）をrecoilにオブジェクト形式で格納
      timeUpdated: todo.timeUpdated,
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
          {/* ソートセレクタ部分 */}
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
          <AddTodoButton />
        </div>

        {/* todoの一覧表示 */}
        <div>
          <ul>
            {/* firebaseに格納されているデータを展開 */}
            {isFetching ? (
              // todoを読み込んでいる最中は、読み込み中を示す文言を表示
              <div>TODOを読み込んでいます ...</div>
            ) : (
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
