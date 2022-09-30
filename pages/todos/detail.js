
import Link from "next/link";

export default function Detail() {
  return (
    <div className="p-4">
      <h1 className="text-white text-xl">詳細ページ</h1>
      <hr />
      {/* input field */}
      <div>
        <h1>Title : Todo1</h1>
        <h2>detailed here</h2>
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          編集
        </button>

        <button
          type="button"
          className="px-5 py-1.5 mb-2 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          削除
        </button>

        <Link href="/todos">
          <button
            type="button"
            className="px-5 py-1.5 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            取消
          </button>
        </Link>
      </div>
    </div>
  );
}
