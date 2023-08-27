import { useNavigate, Link } from "react-router-dom";
import { deletePost } from "@services/post.service";
import { btn } from "@styles/community/tailwindStyle";

const PostControls = ({ bEng, bKor, pCode, pData }) => {
  const nav = useNavigate();

  const postDeleteHandler = async () => {
    const result = await deletePost(pCode);
    if (result) {
      nav(`/community/${bEng}`, { replace: true });
    }
  };

  return (
    <>
      <Link
        className={`${btn} mr-4`}
        to={`/community/write/${pCode}`}
        state={{ data: pData, b_eng: bEng, b_kor: bKor }}
      >
        수정
      </Link>
      <button className={btn} onClick={postDeleteHandler}>
        삭제
      </button>
    </>
  );
};

export default PostControls;
