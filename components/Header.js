import React from "react";
import { useRouter } from "next/router";
import AddTodoButton from "./AddTodoButton";

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
      <AddTodoButton />
    </div>
  );
};

export default Header;
