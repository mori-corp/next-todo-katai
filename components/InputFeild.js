import React from "react";

const InputField = ({ todo, label, onSetTodo, placeholder }) => {
  return (
    <>
      <label
        htmlFor="todoInput"
        className="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-300"
      >
        {label}：
      </label>
      <input
        type="text"
        id="todoInput"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
        autoComplete="off"
        value={todo}
        onChange={(e) => {
          onSetTodo(e.target.value);
        }}
      />
    </>
  );
};

export default InputField;
