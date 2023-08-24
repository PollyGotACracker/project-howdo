import { Outlet } from "react-router-dom";
import Nav from "@components/NavCol";
import NavRow from "@components/NavRow";
import "@styles/App.css";
import { useVideoContentContext } from "@contexts/VideoContentContextProvider";
import { useAutoSearchContext } from "@contexts/AutoSearchProvider";
import Loading from "@components/video/Loading";

const App = () => {
  const { loading } = useVideoContentContext();
  const { autoClick } = useAutoSearchContext();
  return (
    <>
      {loading ? (
        <Loading>
          <div className="App w3-container" onClick={autoClick}>
            <NavRow />
            <div className="flex flex-row">
              <Nav />
              <Outlet />
            </div>
          </div>
        </Loading>
      ) : (
        <div className="App w3-container" onClick={autoClick}>
          <NavRow />
          <div className="flex flex-row">
            <Nav />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
