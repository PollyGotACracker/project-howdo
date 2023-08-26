import { createContext, useContext, useState } from "react";
import { v4 } from "uuid";

const PostContext = createContext();

export const usePostContext = () => {
  return useContext(PostContext);
};

export const PostContextProvider = ({ children }) => {
  const initPost = () => {
    const postData = {
      p_code: v4(),
      username: "",
      p_title: "",
      p_content: "",
      p_thumb: null,
      p_attachs: null,
      b_code: "",
      b_group_code: "",
    };
    return postData;
  };
  const initReply = () => {
    const replyData = {
      r_code: v4(),
      p_code: "",
      username: "",
      r_content: "",
      r_parent_code: null,
    };
    return replyData;
  };

  const [boardList, setBoardList] = useState([]);
  const [postData, setPostData] = useState(initPost);
  const [replyList, setReplyList] = useState([]);
  const [replyCount, setReplyCount] = useState();

  const props = {
    boardList,
    setBoardList,
    initPost,
    postData,
    setPostData,
    initReply,
    replyList,
    setReplyList,
    replyCount,
    setReplyCount,
  };

  return <PostContext.Provider value={props}>{children}</PostContext.Provider>;
};
