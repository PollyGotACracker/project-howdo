import { useEffect } from "react";
import { usePostContext } from "@contexts/PostContextProvider";
import ReplyItem from "@components/community/reply/ReplyItem";
import ReplyForm from "./ReplyForm";

// community post, video에서 사용
const Reply = ({ writer, list, p_code = null, v_code = null }) => {
  const { replyList, setReplyList, replyCount } = usePostContext();

  useEffect(() => {
    setReplyList([...list]);
  }, [list, setReplyList]);

  return (
    <section className="p-5 w-full">
      <div className="text-lg">{`댓글 ${replyCount} 개`}</div>
      <ReplyForm list={list} p_code={p_code} v_code={v_code} />
      <section className="reply">
        {replyList.map((item, index) => (
          <ReplyItem
            key={item.r_code}
            writer={writer}
            item={item}
            index={index}
          />
        ))}
      </section>
    </section>
  );
};

export default Reply;
