import { useState, useEffect } from "react";
import Link from "next/link";
import {
  collection,
  doc,
  getDocs,
  gettDoc,
  onSnapshot,
  querySnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";

export default function Todos() {
  const [todos, setTodos] = useState("");

  useEffect(() => {
    const todoCollectionRef = collection(db, "todos");
    getDocs(todoCollectionRef).then((querySnapshot) => {
      console.log(querySnapshot);
    });
    // if (todoSnap.exists()) {
    //   console.log(todoSnap.data());
    // } else {
    //   console.log("no such document!");
    // }
  }, []);

  return (
    <div className="m-4">
      <div className="flex mb-4">
        <h1 className="text-xl mr-3">Todos page</h1>
        <Link href="/todos/create">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            追加
          </button>
        </Link>
      </div>

      {/* todo field */}
      <div>
        <ul>
          <li className="flex bg-black justify-between items-center p-2 mb-4 w-[70%]">
            <span>テスト入力２</span>
            <div className="flex items-center">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[110px] h-[30px] p-1 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="waiting">Waiting</option>
                <option value="working">Working</option>
                <option value="completed">Completed</option>
              </select>
              <Link href="/todos/detail">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  詳細
                </button>
              </Link>
            </div>
          </li>
          <li className="flex bg-black justify-between items-center p-2 w-[70%]">
            <span>テスト入力２</span>
            <div className="flex items-center">
              <select className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[110px] h-[30px] p-1 mr-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value="waiting">Waiting</option>
                <option value="working">Working</option>
                <option value="completed">Completed</option>
              </select>
              <Link href="/todos/detail">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  詳細
                </button>
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
