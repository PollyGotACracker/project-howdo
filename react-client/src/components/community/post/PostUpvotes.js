import { upvotePost } from "@/services/post.service";
import { btn } from "@/styles/community/tailwindStyle";
import { HandThumbUpIcon } from "@heroicons/react/20/solid";

const PostUpvotes = ({ pCode, pUsername, upvotes, setUpvotes, username }) => {
  const postUpvoteHandler = async () => {
    if (!username) return alert("로그인 후 이용해주세요.");
    const result = await upvotePost(pCode, pUsername, username);
    if (result) setUpvotes(upvotes + result[0]);
  };

  return (
    <button className={btn} onClick={postUpvoteHandler}>
      <div className="text-xl">{upvotes}</div>
      <HandThumbUpIcon className="inline-block m-1 mb-2 h-5 w-5" />
      추천
    </button>
  );
};

export default PostUpvotes;
