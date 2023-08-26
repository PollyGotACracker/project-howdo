import { input, option } from "@/styles/community/tailwindStyle";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { filterList } from "@/hooks/community/board/useFilterPosts";

const BoardFilter = ({
  filterValue,
  showFilter,
  setShowFilter,
  setFilterHandler,
}) => {
  return (
    <button
      className={`search-select relative text-sm w-[130px] ${input} rounded-r-none`}
      onClick={() => setShowFilter(true)}
      onBlur={() => setShowFilter(false)}
    >
      {filterValue.kor}
      <ChevronDownIcon className="inline-block float-right mt-0.5 ml-3 h-4 w-4 text-slate-500" />
      <div
        className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
        style={{ display: showFilter === true ? "flex" : "none" }}
      >
        {filterList.map((item) => {
          return (
            <div
              key={item.s_eng}
              className={option}
              value={item.s_eng}
              onClick={() => setFilterHandler(item.s_eng, item.s_kor)}
            >
              {item.s_kor}
            </div>
          );
        })}
      </div>
    </button>
  );
};

export default BoardFilter;
