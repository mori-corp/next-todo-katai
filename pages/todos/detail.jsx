// タスクの詳細閲覧ページ

import { useState } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { todoState } from "../../components/atoms";
import { useRouter } from "next/router";
import { Header } from "../../components/Header";

export default function Detail() {
  const [isDeleting, setIsDeleting] = useState(false);

  // 各todoの「詳細ボタン」が押された時に、Recoilにセットされたグローバル値を取得
  const { id, title, detail, status, timeUpdated } = useRecoilValue(todoState);
  const router = useRouter();

  // recoilより受け取ったserverTimeStampの値をtoDate()で変換し、見やすいようにyy/mm/dd/hh:mmへ変更
  //月日時分を２桁表示にするため、頭に0をつけて２桁にする
  const getDisplayTime = () => {
    if (timeUpdated === null) return
      const year = timeUpdated.toDate().getFullYear();
      const month = ("0" + (timeUpdated.toDate().getMonth() + 1)).slice(-2);
      const date = ("0" + timeUpdated.toDate().getDate()).slice(-2);
      const hour = ("0" + timeUpdated.toDate().getHours()).slice(-2);
      const min = ("0" + timeUpdated.toDate().getMinutes()).slice(-2);

      return `${year}年${month}月${date}日 ${hour}:${min}`;
  };

  // 削除ボタンをクリックした時の関数
  const handleDelete = async (id) => {
    // isDeletingがtrueの間は、todo削除中に「todoを削除中 ...」の文言を表示
    setIsDeleting(true);

    // firestoreのドキュメントを、RecoilでセットしているstatedTodoのidで参照
    const docRef = doc(db, "todos", id); //第３引数は、document id
    // document（対象のTODO）を削除
    await deleteDoc(docRef);

    setIsDeleting(false);
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
          {/* タイトルの表示 */}
          <span className="text-sm text-slate-300">タイトル：</span>
          <h1 className="bg-slate-800 py-4 px-2 mb-4 max-w-md rounded-sm">
            {title}
          </h1>

          {/* 詳細の表示 */}
          <span className="text-sm text-slate-300">詳細：</span>
          <h2 className="bg-slate-800 py-4 px-2 max-w-md mb-4 rounded-sm">
            {detail}
          </h2>

          {/* ステータスの表示 */}
          <span className="text-sm text-slate-300">状態：</span>
          <h2 className="bg-slate-800 py-2 px-2 max-w-md mb-4 rounded-sm">
            {status === "waiting" && "未着手"}
            {status === "working" && "進行中"}
            {status === "completed" && "完了"}
          </h2>

          {/* 最終更新日時の表示 */}
          <span className="text-sm text-slate-300">最終更新：</span>
          <h2 className="bg-slate-800 py-2 px-2 max-w-md mb-4 rounded-sm">
            {getDisplayTime()}
          </h2>

          {/* TODOを削除している間の表示 */}
          {isDeleting && (
            <div className="text-sm mb-2 text-slate-300">
              TODOを削除しています ...
            </div>
          )}

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
            onClick={() => handleDelete(id)}
          >
            削除
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
      </div>
    </>
  );
}