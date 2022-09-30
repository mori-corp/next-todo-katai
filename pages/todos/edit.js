// 編集ページ


import Link from "next/link";

export default function Edit() {
  return (
    <div className="p-4">
      <h1 className="text-white">Create page</h1>
      {/* input field */}
      <div>
        <input
          className={Styles.input}
          type="text"
          placeholder="current todo"
        />
        <textarea
          className={Styles.textarea}
          name="detail"
          cols="30"
          rows="3"
        />
        <button>Update</button>
        <Link href="#">
          <button>Cancel</button>
        </Link>
      </div>
    </div>
  );
}
