import { postIcon } from "@styles/community/tailwindStyle";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  EyeIcon,
  HandThumbUpIcon,
} from "@heroicons/react/24/outline";

const PostInfo = ({ views, upvotes, replyCount }) => {
  return (
    <>
      <EyeIcon className={postIcon} />
      <span className="mr-4">{views}</span>
      <HandThumbUpIcon className={postIcon} />
      <span className="mr-4">{upvotes}</span>
      <ChatBubbleOvalLeftEllipsisIcon className={postIcon} />
      <span>{replyCount}</span>
    </>
  );
};

export default PostInfo;
