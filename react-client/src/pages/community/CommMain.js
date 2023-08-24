// 커뮤니티 초기 화면
import CommCard from "@components/community/main/CommCard";
import CommList from "@components/community/main/CommList";
import { getMainPosts } from "@services/post.service";
import { useLoaderData } from "react-router-dom";

export const CommMainLoader = async () => {
  const result = await getMainPosts();
  return result;
};

const CommMain = () => {
  const result = useLoaderData();
  // component 함수는 비동기로 실행되서는 안된다(async, await X).
  const BoardBox = () => {
    return result.boardList.map((item) => {
      return (
        <section className="main-item my-10" key={item.b_group_code}>
          <div className="main-item-title mb-2.5 p-2 text-left text-lg font-bold border-b border-slate-500">
            {item.b_group_kor}
          </div>
          <CommCard data={item.list} />
        </section>
      );
    });
  };
  return (
    <main className="comm-main container mx-auto p-5">
      <CommList data={result.noticeList} />
      <BoardBox />
      <CommList data={result.freeList} />
    </main>
  );
};

export default CommMain;
