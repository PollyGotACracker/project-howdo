import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import "@styles/community/Post.css";
import EditorModule from "@utils/EditorModule";
import { btn } from "@styles/community/tailwindStyle";
import { usePostContext } from "@contexts/PostContextProvider";
import { useUserContext } from "@contexts/UserContextProvider";
import { submitPost } from "@services/post.service";
import PostWriteBoard from "@/components/community/post/PostWriteBoard";

const PostWrite = () => {
  const pCode = useParams().post;
  const nav = useNavigate();
  const location = useLocation();
  const { userSession } = useUserContext();
  const { initPost, postData, setPostData } = usePostContext();
  const { b_code, b_kor, b_eng, b_group_code } = location?.state || "";
  const [boardData, setBoardData] = useState({
    bCode: b_code,
    bKor: b_kor,
    bEng: b_eng,
  });

  // setState 를 같은 함수 내에서 여러 번 실행하면
  // 가장 마지막 setState 만 화면에 반영된다(batch update).
  useEffect(() => {
    if (!userSession?.username) {
      alert("로그인 후 이용해주세요.");
      return nav("/");
    }
  }, [userSession.username, nav]);

  useEffect(() => {
    setPostData(() => {
      const { data = initPost() } = location?.state;
      // insert
      if (!pCode)
        return {
          ...data,
          username: userSession?.username,
          b_code: b_code,
          b_group_code: b_group_code,
        };
      // update
      if (pCode)
        return {
          ...data,
        };
    });
  }, [
    setPostData,
    pCode,
    location?.state,
    initPost,
    userSession?.username,
    b_code,
    b_group_code,
  ]);

  const changeContentHandler = (_, editor) => {
    const content = editor.getData();
    setPostData({ ...postData, p_content: content });
  };

  const submitPostHandler = async () => {
    if (!postData.b_code) return alert("게시판을 선택하세요.");
    if (!postData.p_title) return alert("제목을 입력하세요.");
    if (!postData.p_content) return alert("내용을 입력하세요.");
    if (!userSession?.username)
      return alert("세션이 만료되었습니다.\n로그인 후 다시 시도해주세요.");

    let result;
    let post;
    const images = document?.querySelectorAll(".ck-content img");
    if (images) {
      const imageArr = Array?.from(images).map((item) => {
        const index = item?.src?.lastIndexOf("/");
        const url = item?.src?.slice(index + 1);
        return url;
      });
      post = { ...postData, p_thumb: imageArr[0], p_attachs: `${imageArr}` };
    }
    // insert
    if (!pCode) {
      result = await submitPost(post);
      if (result?.MESSAGE) {
        nav(`/community/${boardData.bEng}`, { replace: true });
      }
    }
    // update
    if (pCode) {
      result = await submitPost(post, pCode);
      if (result?.MESSAGE) {
        nav(`/community/${boardData.bEng}/${postData.p_code}`, {
          replace: true,
        });
      }
    }
  };

  return (
    <form className="post-editor">
      <PostWriteBoard
        boardData={boardData}
        setBoardData={setBoardData}
        update={pCode}
      />
      <EditorModule
        data={postData.p_content}
        handler={changeContentHandler}
        code={postData.p_code}
      />
      <button
        id="submit"
        className={`m-6 float-right ${btn}`}
        type="button"
        onClick={submitPostHandler}
      >
        등록
      </button>
    </form>
  );
};

export default PostWrite;
