import React from "react";

const StatusSelector = ({ updatedStatus, onSetUpdatedStatus }) => {
  return (
    <>
      <label
        htmlFor="status"
        className="block text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        ステータス：
      </label>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[80px] h-[30px] p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name="status"
        id="status"
        value={updatedStatus}
        onChange={(e) => onSetUpdatedStatus(e.target.value)}
      >
        <option value="waiting">未着手</option>
        <option value="working">進行中</option>
        <option value="completed">完了</option>
      </select>
    </>
  );
};

export default StatusSelector;
