import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getBoardPosts } from "@/services/post.service";

const initBoardData = {
  b_code: "",
  b_eng: "",
  b_kor: "...",
  b_group_code: "",
  b_group_eng: "",
  b_group_kor: "",
};

const useGetPosts = () => {
  const location = useLocation();
  const params = useParams();
  const [boardData, setBoardData] = useState(initBoardData);
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    (async () => {
      const { data, board } = await getBoardPosts(params.board);
      setPostList([...data]);
      setBoardData({ ...board });
    })();
  }, [location.key, params.board]);

  return { boardData, postList, setPostList };
};

export default useGetPosts;
