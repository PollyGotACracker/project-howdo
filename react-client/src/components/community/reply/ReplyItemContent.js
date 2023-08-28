import { useState } from "react";
import { useUserContext } from "@contexts/UserContextProvider";
import { usePostContext } from "@contexts/PostContextProvider";
import { deleteReply, getReply } from "@services/post.service";
import UserProfile from "@components/community/post/UserProfile";

const ReplyItemContent = ({ writer, item, showChild, setShowChild }) => {
  const { userSession } = useUserContext();
  const { setReplyList, setReplyCount } = usePostContext();
  // set없음?
  const [cReplyCount] = useState(item.r_children);
  const isLogin = userSession?.username;
  const isWriter = item?.nickname === writer;
  const isGranted = userSession?.username === item?.username;

  const deleteReplyHandler = async () => {
    await deleteReply(item.r_code);
    const data = await getReply(item.p_code);
    if (data) {
      setReplyList([...data.list]);
      setReplyCount(data.count);
    }
  };

  const ShowChildReply = async () => setShowChild(!showChild);
  return (
    <>
      <div className="flex">
        <UserProfile imageSrc={item?.profile_image} nickname={item?.nickname} />
        <div className="flex items-center flex-1">
          <span
            className="ml-3 p-1 text-xs text-slate-500 border border-slate-500 rounded-lg"
            style={{
              display: isWriter ? "inline-block" : "none",
            }}
          >
            {"작성자"}
          </span>
        </div>
        <span>{`${item?.r_date} ${item?.r_time}`}</span>
      </div>
      <div className="pt-5 pb-5">{item?.r_content || "삭제된 댓글입니다."}</div>
      {isGranted && (
        <div className="w-full flex justify-end">
          <button className="hover:text-blue-700" onClick={deleteReplyHandler}>
            삭제
          </button>
        </div>
      )}

      <div className="px-3">
        <span
          className="mr-5 text-slate-500"
          style={{ display: cReplyCount ? "inline-block" : "none" }}
        >
          {cReplyCount && `${cReplyCount} 개의 댓글`}
        </span>
        <button
          className={`hover:text-blue-700 ${showChild ? "text-blue-700" : ""}`}
          style={{
            display: isLogin ? "inline-block" : "none",
          }}
          onClick={() => ShowChildReply(item.r_code)}
          disabled={!isLogin ? true : false}
        >
          {isLogin && "댓글 쓰기"}
        </button>
      </div>
    </>
  );
};

export default ReplyItemContent;
