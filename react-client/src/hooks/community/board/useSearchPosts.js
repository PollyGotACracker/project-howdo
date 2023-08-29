import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const useSearchPosts = () => {
  const [searchParams] = useSearchParams();
  const [searchInput, setSearchInput] = useState(
    searchParams.get("keyword") || ""
  );
  const [searchMsg, setSearchMsg] = useState();

  useEffect(() => {
    setSearchInput(searchParams.get("keyword") || "");
    if (!searchParams.get("pageNum")) {
      setSearchInput("");
      setSearchMsg("");
    }
  }, [searchParams, setSearchInput, setSearchMsg]);

  return { searchInput, setSearchInput, searchMsg, setSearchMsg };
};

export default useSearchPosts;
