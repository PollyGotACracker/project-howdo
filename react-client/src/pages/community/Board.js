// 각 게시판별 페이지
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "@styles/community/Board.css";
import { getBoardPosts, getSearchedPosts } from "@services/post.service";
import useGetPosts from "@hooks/community/board/useGetPosts";
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

const Board = () => {
  const location = useLocation();
  const [locKey, setLocKey] = useState("");
  const { boardData, postList, setPostList } = useGetPosts();
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
    if (location.key !== locKey) {
      setOrderValue(initOrder);
      setShowOrder(false);
      setFilterValue(initFilter);
      setShowFilter(false);
      setSearchMsg("");
      setSearchInput("");
    }
    setLocKey(location.key);
  }, [
    location.key,
    locKey,
    setFilterValue,
    setOrderValue,
    setSearchInput,
    setSearchMsg,
    setShowFilter,
    setShowOrder,
  ]);

  const setOrderHandler = async (value, text) => {
    // search 가 없을 때
    if (!location?.state?.msg) {
      const result = await getBoardPosts(boardData?.b_eng, value).then(
        (result) => result.data
      );
      setPostList([...result]);
    }
    // search 가 있을 때
    else {
      const result = await getSearchedPosts({
        bCode: boardData?.b_code,
        value: searchInput,
        filter: filterValue?.eng,
        order: value,
      }).then((result) => result.data);
      setPostList([...result]);
    }
    setOrderValue({ eng: value, kor: text });
    setShowOrder(false);
  };

  const searchPostsHandler = async (e) => {
    if (e.type === "click" || (e.type === "keydown" && e.keyCode === 13)) {
      const result = await getSearchedPosts({
        bCode: boardData.b_code,
        value: searchInput,
        filter: filterValue.eng,
        order: orderValue.eng,
      });
      setPostList([...result.data]);
      setSearchInput(searchInput);
      setFilterValue({
        ...filterValue,
        eng: filterValue.eng,
        kor: filterValue.kor,
      });
      setSearchMsg(result.MESSAGE);
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
    </main>
  );
};

export default Board;
