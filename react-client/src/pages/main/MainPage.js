import MainpageBbs from "@components/main/MainPageBbs";
import MainpageContent from "@components/main/MainPageContent";
import MainContentRow from "@components/main/MainContentRow";
const MainPage = () => {
  return (
    <div className="relative ml-52">
      <MainpageBbs />
      <MainpageContent />
      <MainContentRow />
    </div>
  );
};

export default MainPage;
