import { Link } from "react-router-dom";

const BoardSearchHeader = ({ searchMsg, bEng }) => {
  return (
    <div
      className="text-center p-3 mx-5 mt-5 border-b border-slate-200"
      style={{ display: searchMsg ? "block" : "none" }}
    >
      {searchMsg}
      <Link
        className="block text-center w-[10em] p-1 mx-auto mt-2 underline text-blue-500"
        to={`/community/${bEng}`}
      >
        모든 게시글 보기
      </Link>
    </div>
  );
};

export default BoardSearchHeader;
