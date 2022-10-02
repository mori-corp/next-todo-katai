import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export const Header = () => {
  const router = useRouter();

  return (
    <div className="w-100 bg-black py-4 flex justify-between">
      <h1
        className="ml-4 text-xl hover:text-slate-300 cursor-pointer inline"
        onClick={() => router.push("/todos")}
      >
        Next Todo
      </h1>
      {/* TODO新規作成ボタン */}
      <Link href="/todos/create">
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          追加
        </button>
      </Link>
    </div>
  );
};

export default Header;
