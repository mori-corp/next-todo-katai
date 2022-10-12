import React from "react";

const Textarea = ({ detail, onSetDetail }) => {
  return (
    <>
      <label
        htmlFor="detail"
        className="block text-sm font-medium text-gray-900 mb-1 dark:text-gray-300"
      >
        詳細：
      </label>
      <textarea
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 mb-2 w-80 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        id="detail"
        name="detail"
        cols="30"
        rows="3"
        placeholder="ここに詳細を入力"
        value={detail}
        onChange={(e) => {
          onSetDetail(e.target.value);
        }}
      />
    </>
  );
};

export default Textarea;
