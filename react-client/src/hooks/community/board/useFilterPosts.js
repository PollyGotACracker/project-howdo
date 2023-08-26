import { useState } from "react";

export const filterList = [
  { s_eng: "title_content", s_kor: "제목+내용" },
  { s_eng: "title", s_kor: "제목" },
  { s_eng: "content", s_kor: "내용" },
  { s_eng: "nickname", s_kor: "닉네임" },
  { s_eng: "reply", s_kor: "댓글" },
];

export const initFilter = () => {
  const filter = {
    eng: `${filterList[0].s_eng}`,
    kor: `${filterList[0].s_kor}`,
  };
  return filter;
};

const useFilterPosts = () => {
  const [filterValue, setFilterValue] = useState(initFilter);
  const [showFilter, setShowFilter] = useState(false);

  const setFilterHandler = (value, text) => {
    setFilterValue({ ...filterValue, eng: value, kor: text });
  };

  return {
    filterValue,
    setFilterValue,
    showFilter,
    setShowFilter,
    setFilterHandler,
  };
};

export default useFilterPosts;
