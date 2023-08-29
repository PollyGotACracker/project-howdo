import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import MainPage from "@pages/main/MainPage";
import MyPageMain, {
  myPageFetch as myPageLoader,
} from "@pages/mypage/MyPageMain";
import Join from "@pages/user/Join";
import Login from "@pages/user/Login";
import LoginModal from "@pages/user/Login";
import CommIndex, { CommLoader } from "@pages/community/CommIndex";
import CommMain, { CommMainLoader } from "@pages/community/CommMain";
import Board, { BoardLoader } from "@pages/community/Board";
import PostDetail, {
  loader as DetailLoader,
} from "@pages/community/PostDetail";
import PostWrite from "@pages/community/PostWrite";
import Approve from "@pages/purchase/Approve";
import PayReady from "@pages/purchase/PayReady";
import SearchMain, { SearchLoader } from "@pages/search/SearchMain";
import CreaterPageMain, {
  CreaterPageFetch,
} from "@pages/creater/CreaterPageMain";
import ShortMain from "@pages/video/Main";
import VideoDetail from "@pages/video/VideoDetail";
import CreaterMain, {
  loader as CreaterFetch,
} from "@pages/creater/CreaterMain";
import Subscribe from "@pages/purchase/Subscribe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <MainPage /> },
      { path: "/user", element: <Join /> },
      { path: "/user/login", element: <Login /> },
      { path: "/:id", loader: myPageLoader, element: <MyPageMain /> },
      { path: "/creater", loader: CreaterFetch, element: <CreaterMain /> },
      {
        path: "/creater/:id",
        loader: CreaterPageFetch,
        element: <CreaterPageMain />,
      },
      { path: "/login", element: <LoginModal /> },
      {
        path: "/community",
        loader: CommLoader,
        element: <CommIndex />,
        children: [
          { path: "", loader: CommMainLoader, element: <CommMain /> },
          {
            path: ":board",
            loader: BoardLoader,
            element: <Board />,
          },
          {
            path: ":board/search",
            loader: BoardLoader,
            element: <Board />,
          },
          {
            path: ":board/:post",
            loader: DetailLoader,
            element: <PostDetail />,
          },
          {
            path: "write/:post?",
            element: <PostWrite />,
          },
        ],
      },

      { path: "/approval", element: <Approve /> },
      { path: "/payReady", element: <PayReady /> },
      { path: "/subscribe", element: <Subscribe /> },
      { path: "/search/:query", loader: SearchLoader, element: <SearchMain /> },
      { path: "/video/shorts", element: <ShortMain /> },
      { path: "/video/detail/:v_code", element: <VideoDetail /> },
    ],
  },
]);

export default router;
