import { useEffect, useState } from "react";
import { btnOutline, inputReply } from "@styles/community/tailwindStyle";
import { useUserContext } from "@contexts/UserContextProvider";
import { usePostContext } from "@contexts/PostContextProvider";
import { getReply, insertReply } from "@services/post.service";
import UserProfile from "@components/community/post/UserProfile";

const ReplyForm = ({ list, p_code, v_code }) => {
  const { userSession } = useUserContext();
  const { initReply, setReplyList, setReplyCount } = usePostContext();
  const [replyInput, setReplyInput] = useState(initReply);
  const isNotLogin = !userSession?.username;

  const changeReplyHandler = (e) => {
    setReplyInput({
      ...replyInput,
      p_code: p_code,
      v_code: v_code,
      r_content: e.target.value,
      username: userSession?.username,
      r_parent_code: null,
    });
  };

  const replySubmitHandler = async () => {
    setReplyInput(initReply);
    await insertReply(replyInput);
    let data = await getReply(replyInput.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
      setReplyInput(initReply);
      window.alert("댓글이 등록되었습니다.");
    }
  };

  useEffect(() => {
    setReplyInput(initReply);
  }, [list, setReplyInput, initReply]);

  return (
    <div className="reply-input-box flex gap-3 mt-5 mb-5 p-10 w-full border border-gray-300 rounded">
      <UserProfile
        imageSrc={userSession?.profile_image}
        nickname={userSession?.nickname}
      />
      <input
        className={inputReply}
        value={replyInput.r_content}
        onChange={changeReplyHandler}
        placeholder={
          isNotLogin ? "로그인 후 이용해주세요." : "댓글을 입력하세요."
        }
        disabled={isNotLogin ? true : false}
      />
      <button
        className={btnOutline}
        onClick={replySubmitHandler}
        disabled={isNotLogin || replyInput.r_content.length < 1}
      >
        등록
      </button>
    </div>
  );
};

export default ReplyForm;
