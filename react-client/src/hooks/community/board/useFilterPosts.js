import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const filterList = [
  { s_eng: "title_content", s_kor: "제목+내용" },
  { s_eng: "title", s_kor: "제목" },
  { s_eng: "content", s_kor: "내용" },
  { s_eng: "nickname", s_kor: "닉네임" },
  { s_eng: "reply", s_kor: "댓글" },
];

export const initFilter = {
  s_eng: filterList[0].s_eng,
  s_kor: filterList[0].s_kor,
};

const useFilterPosts = () => {
  const [searchParams] = useSearchParams();
  const setFilter = () => {
    const value = searchParams.get("filter");
    if (!value) return initFilter;
    const matched = filterList.filter((item) => item.s_eng === value);
    return matched[0];
  };

  const [filterValue, setFilterValue] = useState(setFilter);
  const [showFilter, setShowFilter] = useState(false);

  const setFilterHandler = (value, text) => {
    setFilterValue({ s_eng: value, s_kor: text });
  };

  useEffect(() => {
    if (!searchParams.get("pageNum")) {
      setFilterValue(initFilter);
      setShowFilter(false);
    }
  }, [searchParams, setFilterValue, setShowFilter]);

  return {
    filterValue,
    setFilterValue,
    showFilter,
    setShowFilter,
    setFilterHandler,
  };
};

export default useFilterPosts;
