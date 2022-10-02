import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { todoState } from "../../components/atoms";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";

export default function Detail() {
  // atomsより、todoの値を取得
  const statedTodo = useRecoilValue(todoState);
  const router = useRouter();

  // 削除ボタンをクリックした時の関数
  const handleDelete = async (id) => {
    // ドキュメントのを、Recoilで日っぱてきているstatedTodoのidで参照
    const docRef = doc(db, "todos", id); //第３引数は、document id
    // document（対象のTODO）を削除
    await deleteDoc(docRef);
    // /todosへ遷移
    router.push("/todos");
  };

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-white text-xl mb-2">詳細ページ</h1>
        <hr />
        <div className="mt-2">
          <span className="text-sm text-slate-300">タイトル：</span>
          <h1 className="bg-slate-800 py-4 px-2 mb-4 max-w-md rounded-sm">
            {statedTodo.title}
          </h1>
          <span className="text-sm text-slate-300">詳細：</span>
          <h2 className="bg-slate-800 py-4 px-2 max-w-md mb-4 rounded-sm">
            {statedTodo.detail}
          </h2>

          {/* 編集ボタン */}
          <Link href="/todos/edit">
            <button
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              編集
            </button>
          </Link>

          {/* 削除ボタン */}
          <button
            type="button"
            className="px-5 py-1.5 mb-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => handleDelete(statedTodo.id)}
          >
            削除
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
    </>
  );
}
