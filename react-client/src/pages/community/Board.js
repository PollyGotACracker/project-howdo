// 각 게시판별 페이지
import { useState, useEffect } from "react";
import {
  useLoaderData,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import "@styles/community/Board.css";
import {
  getBoardData,
  getBoardPosts,
  getSearchedPosts,
} from "@services/post.service";
import useOrderPosts, { initOrder } from "@hooks/community/board/useOrderPosts";
import useFilterPosts, {
  initFilter,
} from "@hooks/community/board/useFilterPosts";
import useSearchPosts from "@hooks/community/board/useSearchPosts";
import BoardOrder from "@components/community/board/BoardOrder";
import BoardFilter from "@components/community/board/BoardFilter";
import BoardSearch from "@components/community/board/BoardSearch";
import BoardWriteButton from "@components/community/board/BoardWriteButton";
import BoardSearchHeader from "@components/community/board/BoardSearchHeader";
import BoardPostList from "@components/community/board/BoardPostList";
import BoardNav from "@components/community/board/BoardNav";

const listLimit = 5;
const pageNavCount = 5;
let pageNum;

export const BoardLoader = async ({ params }) => {
  const bEng = params?.board;
  const boardData = await getBoardData(bEng);
  return { boardData: boardData };
};

const Board = () => {
  const bEng = useParams().board;
  const boardData = useLoaderData()?.boardData;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [pagination, setPagination] = useState({});
  const [postList, setPostList] = useState([]);
  const { orderValue, setOrderValue, showOrder, setShowOrder } =
    useOrderPosts();
  const {
    filterValue,
    setFilterValue,
    showFilter,
    setShowFilter,
    setFilterHandler,
  } = useFilterPosts();
  const { searchInput, setSearchInput, searchMsg, setSearchMsg } =
    useSearchPosts();

  useEffect(() => {
    if (!searchParams.get("pageNum")) {
      setOrderValue(initOrder);
      setFilterValue(initFilter);
      setShowOrder(false);
      setShowFilter(false);
      setSearchInput("");
      setSearchMsg("");
    }
  }, [
    searchParams,
    setFilterValue,
    setOrderValue,
    setSearchInput,
    setSearchMsg,
    setShowFilter,
    setShowOrder,
  ]);

  useEffect(() => {
    (async () => {
      const isSearched = searchParams.get("keyword");
      let result;
      let query = new URLSearchParams({
        bEng: boardData.b_eng,
        bCode: boardData.b_code,
        order: searchParams.get("order") || "latest",
        pageNum: searchParams.get("pageNum") || 1,
        listLimit: listLimit,
        pageNavCount: pageNavCount,
      });

      if (!isSearched) {
        query.toString();
        result = await getBoardPosts(query);
      }
      if (isSearched) {
        query.append("keyword", searchParams.get("keyword"));
        query.append("filter", searchParams.get("filter"));
        query.toString();
        result = await getSearchedPosts(query);
        setSearchMsg(result?.MESSAGE);
      }

      setPagination({ ...result?.pagination });
      setPostList([...result?.data]);
    })();
  }, [searchParams, boardData.b_code, boardData.b_eng, setSearchMsg]);

  const setOrderHandler = async (orderEng, orderKor) => {
    setOrderValue({ o_eng: orderEng, o_kor: orderKor });
    setShowOrder(false);

    let query = new URLSearchParams({
      pageNum: pageNum || 1,
      listLimit,
      pageNavCount,
      order: orderEng,
    });
    const isSearched = searchInput && searchInput !== "";
    if (!isSearched) {
      query = query.toString();
      navigate(`/community/${boardData.b_eng}?${query}`);
    }
    if (isSearched) {
      query.append("filter", filterValue.s_eng);
      query.append("keyword", searchInput);
      query = query.toString();
      navigate(`/community/${boardData.b_eng}/search?${query}`);
    }
  };

  const searchPostsHandler = async (e) => {
    const isSubmitted =
      (e.type === "keydown" && e.keyCode === 13) || e.type === "click";
    if (isSubmitted) {
      const query = new URLSearchParams({
        pageNum: 1,
        listLimit,
        pageNavCount,
        order: orderValue.o_eng,
        filter: filterValue.s_eng,
        keyword: searchInput,
      }).toString();
      navigate(`/community/${boardData.b_eng}/search?${query}`);
    }
  };

  return (
    <main className="commu-cat w-full">
      <div className="border-l-8 border-slate-400 text-2xl font-bold p-5 mb-5">
        {boardData.b_kor}
      </div>
      <section className="flex w-full pb-5 justify-between">
        <BoardOrder
          orderValue={orderValue}
          showOrder={showOrder}
          setShowOrder={setShowOrder}
          setOrderHandler={setOrderHandler}
        />
        <BoardSearch
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          searchPostsHandler={searchPostsHandler}
        >
          <BoardFilter
            filterValue={filterValue}
            showFilter={showFilter}
            setShowFilter={setShowFilter}
            setFilterHandler={setFilterHandler}
          />
        </BoardSearch>
        <BoardWriteButton boardData={boardData} />
      </section>
      <BoardSearchHeader searchMsg={searchMsg} bEng={boardData.b_eng} />
      <BoardPostList board={boardData} data={postList} />
      <BoardNav
        bEng={bEng}
        pagination={pagination}
        listLimit={listLimit}
        pageNavCount={pageNavCount}
      />
    </main>
  );
};

export default Board;

// cf) useLocation 의 state 는 useState 와 달리
// 새로고침해도 데이터가 사라지지 않고, url이 바뀌었을 때만 사라진다.
