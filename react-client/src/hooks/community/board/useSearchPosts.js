import { useState } from "react";

const useSearchPosts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchMsg, setSearchMsg] = useState("");

  return { searchInput, setSearchInput, searchMsg, setSearchMsg };
};

export default useSearchPosts;
