// 게시글 상세보기
import { useState, useEffect } from "react";
import { useLoaderData, useParams, useNavigate, Link } from "react-router-dom";
import "@styles/community/Post.css";
import { getDetailPost, getReply } from "@services/post.service";
import { usePostContext } from "@contexts/PostContextProvider";
import { useUserContext } from "@contexts/UserContextProvider";
import UserProfile from "@components/community/post/UserProfile";
import PostInfo from "@components/community/post/PostInfo";
import PostUpvotes from "@components/community/post/PostUpvotes";
import PostControls from "@components/community/post/PostControls";
import Reply from "@components/community/reply/Reply";

export const loader = async ({ params }) => {
  const pCode = params.post;
  const detail = await getDetailPost(pCode);
  const reply = await getReply(pCode);
  return { detail, reply };
};

const PostDetail = () => {
  const nav = useNavigate();
  const bEng = useParams().board;
  const { detail, reply } = useLoaderData();
  const { board = {}, post = {} } = detail;
  const { list = [], count = undefined } = reply;
  const { userSession } = useUserContext();
  const { replyCount, setReplyCount } = usePostContext();
  const [upvotes, setUpvotes] = useState(post?.p_upvotes);
  const isSameUser = userSession?.username === post?.username;

  useEffect(() => {
    (async () => {
      if (detail.ERROR) {
        return nav(`/community/${bEng}`, { replace: true });
      }
      setReplyCount(count);
    })();
  }, [bEng, count, detail.ERROR, nav, post?.p_upvotes, setReplyCount]);

  return (
    <main className="commu-detail w-full p-5 mb-10 rounded border border-slate-300">
      <section className="flex p-2 border-b border-slate-300">
        <Link
          className="board inline-block px-2 mr-3 border border-blue-700 text-blue-700 rounded hover:bg-blue-700 hover:text-white"
          to={`/community/${board?.b_eng}`}
        >
          {board?.b_kor}
        </Link>
        <div className="title flex-1 text-xl font-semibold">
          {post?.p_title}
        </div>
        <PostInfo
          views={post?.p_views}
          upvotes={upvotes}
          replyCount={replyCount}
        />
      </section>
      <section className="p-2">
        <UserProfile
          imageSrc={post?.user?.profile_image}
          nickname={post?.user?.nickname}
        />
        <span className="float-right">{`${post?.p_date} ${post?.p_time}`}</span>
      </section>
      <section className="flex flex-col items-center w-full p-20">
        <div
          className="content w-full pb-20"
          dangerouslySetInnerHTML={{ __html: post?.p_content }}
        ></div>
        <PostUpvotes
          pCode={post.p_code}
          pUsername={post.username}
          upvotes={upvotes}
          setUpvotes={setUpvotes}
          username={userSession?.username}
        />
      </section>
      {isSameUser && (
        <section className="button-box flex justify-end w-full">
          <PostControls
            bEng={board?.b_eng}
            bKor={board?.b_kor}
            pCode={post.p_code}
            pData={post}
          />
        </section>
      )}
      <Reply writer={post?.user?.nickname} p_code={post?.p_code} list={list} />
    </main>
  );
};

export default PostDetail;
