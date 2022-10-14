import React from "react";
import { useRouter } from "next/router";
import { auth } from "../firebase";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState } from "../lib/auth";

export const Header = () => {
  const router = useRouter();
  const { uid, statedEmail } = useRecoilValue(userState);

  const [user, setUser] = useRecoilState(userState);
  /**
   * ログアウトする
   */
  const handleLogOut = async () => {
    try {
      setUser({
        uid: null,
        statedEmail: null,
      });
      console.log("logged out", uid, statedEmail);
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
      <span>{statedEmail} としてログインしています。</span>

      <div>
        <button className="mr-4" onClick={handleLogOut}>
          ログアウト
        </button>
      </div>
    </div>
  );
};

export default Header;
