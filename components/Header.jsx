import React from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { useSetRecoilState } from "recoil";
import { userState } from "../lib/atoms";

export const Header = () => {
  const router = useRouter();
  const setUser = useSetRecoilState(userState);
  /**
   * ログアウトする
   */
  const handleLogOut = async () => {
    try {
      setUser(null);
      await auth.signOut();

      router.push("/login");
    } catch (error) {
      alert("サインアウトに失敗しました。");
    }
  };

  return (
    <div className="w-100 bg-black py-4 flex justify-between">
      <h1
        className="ml-4 text-xl hover:text-slate-300 cursor-pointer inline"
        onClick={() => router.push("/")}
      >
        Next Todo
      </h1>
      <div>
        <button className="mr-4" onClick={handleLogOut}>
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Header;
