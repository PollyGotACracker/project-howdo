import { Link } from "react-router-dom";
import { useUserContext } from "@contexts/UserContextProvider";
import { btn } from "@/styles/community/tailwindStyle";

const BoardWriteButton = ({ boardData }) => {
  const { userSession } = useUserContext();
  const isGranted = Number(userSession?.level) >= Number(boardData.b_level);

  return (
    <>
      {isGranted && (
        <Link
          className={btn}
          to={`/community/write`}
          state={{
            b_code: boardData.b_code,
            b_kor: boardData.b_kor,
            b_eng: boardData.b_eng,
            b_group_code: boardData.b_group_code,
          }}
        >
          글쓰기
        </Link>
      )}
    </>
  );
};

export default BoardWriteButton;
