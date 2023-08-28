import { useState } from "react";
import ReplyItemForm from "@components/community/reply/ReplyItemForm";
import ReplyItemContent from "@components/community/reply/ReplyItemContent";

const ReplyItem = ({ writer, item, index }) => {
  const [showChild, setShowChild] = useState(false);
  const isNotFirst = !item.r_parent_code && index !== 0;
  const isSearched = window?.location?.hash === `#${item?.r_code}`;

  return (
    <section
      className={
        isNotFirst
          ? "border-t border-slate-300 snap-mandatory"
          : "snap-mandatory"
      }
      style={{ marginLeft: item.r_parent_code ? "2rem" : "0" }}
    >
      <div className="w-full">
        <div
          className={
            item.r_parent_code
              ? "w-full mb-2 p-5 scroll-mt-[150px] border-l-4"
              : "w-full mb-2 p-5 scroll-mt-[150px]"
          }
          id={item?.r_code}
          style={{
            backgroundColor: isSearched && "#EFE7DB",
          }}
        >
          <ReplyItemContent
            writer={writer}
            item={item}
            showChild={showChild}
            setShowChild={setShowChild}
          />
          <div
            style={{
              display: showChild === true ? "block" : "none",
            }}
          >
            <ReplyItemForm item={item} index={index} />
          </div>
        </div>
        {item?.reply_child?.map((child, index) => (
          <ReplyItem
            key={child.r_code}
            writer={writer}
            item={child}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default ReplyItem;

/**
 * cf) anchor 와 id 의 hash(#) 를 이용해 scroll 위치 이동
 * 만약 상단 nav 밑으로 요소가 가려질 경우 css 로 해결한다.
 * 부모 요소에 scroll-snap-type 을 주고
 * id 가 있는 해당 요소에 scroll-margin-top 을 줄 것
 * 일반적인 스크롤에 영향을 주지 않는다.
 */
