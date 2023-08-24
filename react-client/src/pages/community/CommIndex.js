import "@styles/community/Index.css";
import BoardNav from "@components/community/board/BoardNav";
import { useLoaderData, Outlet } from "react-router-dom";
import { getBoardList } from "@services/post.service";

export const CommLoader = async () => {
  const board = await getBoardList();
  return board;
};

const CommIndex = () => {
  const board = useLoaderData();

  return (
    <main className="comm-index container mx-auto">
      <BoardNav data={board} />
      <Outlet />
    </main>
  );
};

export default CommIndex;
