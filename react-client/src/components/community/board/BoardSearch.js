import { input } from "@styles/community/tailwindStyle";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const BoardSearch = ({
  searchInput,
  setSearchInput,
  searchPostsHandler,
  children,
}) => {
  return (
    <div className="cat-search flex-1 flex justify-center">
      {children}
      <input
        className={`${input} w-[20vw] rounded-none`}
        onChange={({ target }) => setSearchInput(target.value)}
        onKeyDown={searchPostsHandler}
        spellCheck={false}
        value={searchInput}
        type="search"
      />
      <button
        className={`${input} rounded-l-none`}
        onClick={searchPostsHandler}
        disabled={searchInput?.length > 0 ? false : true}
      >
        <MagnifyingGlassIcon className="inline-block h-6 w-6 text-slate-500" />
      </button>
    </div>
  );
};

export default BoardSearch;
