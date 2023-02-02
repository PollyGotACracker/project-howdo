export const getMainPosts = async () => {
  try {
    const response = await fetch("/community/posts/get");
    const result = await response.json();
    // noticeList, freeList, boardList
    return result;
  } catch (err) {
    return null;
  }
};

export const getBoardPosts = async (bEng) => {
  try {
    const response = await fetch(`/community/board/${bEng}/get`);
    const result = await response.json();
    // board, data;
    return result;
  } catch (err) {
    return null;
  }
};

export const getDetailPost = async (pCode) => {
  try {
    const response = await fetch(`/community/post/${pCode}/get`);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      // post, board
      return result;
    }
    return result;
  } catch (err) {
    return null;
  }
};

export const submitPost = async (data) => {
  const fetchOption = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  };
  try {
    const response = await fetch("/community/post/insert", fetchOption);
    const result = await response.json();
    alert(result.MESSAGE);
  } catch (err) {
    return null;
  }
};

export const deletePost = async (pCode) => {
  if (window.confirm("이 게시글을 삭제하시겠습니까?"))
    try {
      const response = await fetch(`/community/post/${pCode}/delete`);
      const result = await response.json();
      if (result.ERROR) {
        alert(result.ERROR);
        return null;
      }
      alert(result.MESSAGE);
      return result.MESSAGE;
    } catch (err) {
      return null;
    }
};

export const upvotePost = async (pCode, username) => {
  try {
    const fetchOption = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ p_code: pCode, username: username }),
    };
    const response = await fetch(`/community/post/upvote`, fetchOption);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    } else {
      return result;
    }
  } catch (err) {
    return null;
  }
};

export const getReply = async (pCode) => {
  try {
    const response = await fetch(`/community/reply/${pCode}/get`);
    const result = await response.json();
    const data = {
      list: result.replyList,
      count: result.replyCount.p_replies,
    };
    return data;
  } catch (err) {
    return null;
  }
};

export const insertReply = async (data) => {
  try {
    const fetchOption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(`/community/reply/insert`, fetchOption);
    const result = await response.json();
    if (result.ERROR) {
      alert(result.ERROR);
      return null;
    }
    return null;
  } catch (err) {
    return null;
  }
};
