import { MinusIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import PostInfo from "@components/community/post/PostInfo";

const BoardPostList = ({ board, data }) => {
  const searchReplyList = (post) => {
    return post?.replies.map((reply) => (
      <HashLink
        className="p-5 block bg-slate-100 border-b-2 border-white"
        to={`/community/${board?.b_eng}/${post?.p_code}#${reply?.r_code}`}
      >
        <MinusIcon className="inline-block h-5 w-5 text-slate-500" />
        <span className="ml-5 mr-2">{`${reply?.user?.nickname} : `}</span>
        <span>{reply?.r_content}</span>
      </HashLink>
    ));
  };

  const PostList = () => {
    return data.map((post) => {
      return (
        <div key={post?.p_code}>
          <Link
            to={`/community/${board?.b_eng}/${post?.p_code}`}
            className="list-item p-3 border-b border-dashed border-slate-300"
          >
            <div className="title font-semibold text-lg">{post?.p_title}</div>
            <div className="date text-sm flex justify-end items-end">{`${post?.p_date} ${post?.p_time}`}</div>
            <div className="nickname text-sm flex items-center">
              {post?.user?.nickname}
            </div>
            <div className="detail-box text-right">
              <PostInfo
                views={post?.p_views}
                upvotes={post?.p_upvotes}
                replyCount={post?.p_replies}
              />
            </div>
          </Link>
          {post?.replies && searchReplyList(post)}
        </div>
      );
    });
  };

  return (
    <section className="commu-list pl-5 pr-5 w-full">
      <ul className="item-wrapper w-full">
        <PostList />
      </ul>
    </section>
  );
};

export default BoardPostList;
