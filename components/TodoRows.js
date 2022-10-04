import React from "react";

const TodoRows = ({ todo, onHandleDetailButtonClick }) => {
  return (
    <li
      key={todo.id}
      className="flex bg-slate-800 hover:bg-slate-700 justify-between items-center p-2 mb-4 min-w-[380px] max-w-[580px] rounded-sm"
    >
      <span>{todo.title}</span>
      <div className="flex items-center">
        {/* ステータスの表示 */}
        {/* <span className="rounded-lg bg-[#111827] text-sm px-3 py-1.5 mr-2">
          {todo.status === "working" && "進行中"}
          {todo.status === "completed" && "完了"}
        </span> */}
        {todo.status === "waiting" && (
          <span className="rounded-lg bg-red-600 text-sm px-3 mr-2 py-1.5">
            未着手
          </span>
        )}
        {todo.status === "working" && (
          <span className="rounded-lg bg-[#111827] text-sm px-3 mr-2 py-1.5">
            進行中
          </span>
        )}
        {todo.status === "completed" && (
          <span className="rounded-lg bg-slate-500 text-sm px-4 mr-2 py-1.5">
            完了
          </span>
        )}

        {/* 詳細ボタン */}
        <button
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          onClick={() => {
            onHandleDetailButtonClick(todo);
          }}
        >
          詳細
        </button>
      </div>
    </li>
  );
};

export default TodoRows;
