import React from "react";
import Link from "next/link";

const AddTodoButton = () => {
  return (
    <Link href="/todos/create">
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 mr-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        追加
      </button>
    </Link>
  );
};

export default AddTodoButton;
