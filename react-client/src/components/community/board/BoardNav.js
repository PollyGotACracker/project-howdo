import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const BoardNav = ({ bEng, pagination, listLimit, pageNavCount }) => {
  const [searchParams] = useSearchParams();
  const [navNumArr, setNavNumArr] = useState([]);

  useEffect(() => {
    if (!pagination?.startNavNum) return;
    const startNavNum = pagination.startNavNum;
    let endNavNum = startNavNum + pagination.pageNavCount;
    endNavNum =
      endNavNum > pagination.pageTotalCount
        ? pagination.pageTotalCount + 1
        : endNavNum;
    const _navNumArr = [
      0,
      startNavNum > 1 && (pagination.pageNum - 1) * -1,
      ...Array.from(Array(endNavNum - startNavNum).keys()).map(
        (val) => val + startNavNum
      ),
      endNavNum <= pagination.pageTotalCount && (pagination.pageNum + 1) * -1,
      Number.MAX_SAFE_INTEGER,
    ];

    setNavNumArr([..._navNumArr]);
  }, [pagination]);

  const Navigation = () => {
    return navNumArr?.reduce((result, nav) => {
      if (nav) {
        const pageNum =
          nav < 0
            ? nav * -1
            : nav === 0
            ? 1
            : nav === Number.MAX_SAFE_INTEGER
            ? pagination.pageTotalCount
            : nav;

        const query = new URLSearchParams({
          pageNum: pageNum,
          listLimit: listLimit,
          pageNavCount: pageNavCount,
        });
        searchParams.get("order") &&
          query.append("order", searchParams.get("order"));
        searchParams.get("filter") &&
          query.append("filter", searchParams.get("filter"));
        searchParams.get("keyword") &&
          query.append("keyword", searchParams.get("keyword"));

        const url = searchParams.get("keyword")
          ? `/community/${bEng}/search?`
          : `/community/${bEng}?`;

        result = [
          ...result,
          <div key={nav}>
            <Link
              key={nav}
              className={
                (nav !== 0 &&
                  nav !== Number.MAX_SAFE_INTEGER &&
                  searchParams.get("pageNum") === `${pageNum}`) ||
                (!searchParams.get("pageNum") && pageNum === 1)
                  ? "active text-lg text-blue-500"
                  : "text-lg"
              }
              to={`${url}${query}`}
            >
              {nav < 0 ? (
                <>&middot;&middot;&middot;</>
              ) : nav === 0 ? (
                <>&#x2758;&lt;</>
              ) : nav === Number.MAX_SAFE_INTEGER ? (
                <>&gt;&#x2758;</>
              ) : (
                nav
              )}
            </Link>
          </div>,
        ];
      }
      return result;
    }, []);
  };

  return (
    <div className="pageNavBar flex justify-center gap-3 w-full mt-5">
      <Navigation />
    </div>
  );
};

export default BoardNav;
