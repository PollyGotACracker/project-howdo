import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const orderList = [
  { o_eng: "latest", o_kor: "최신순" },
  { o_eng: "upvotes", o_kor: "추천순" },
  { o_eng: "replies", o_kor: "댓글순" },
  { o_eng: "views", o_kor: "조회순" },
];

export const initOrder = {
  o_eng: orderList[0].o_eng,
  o_kor: orderList[0].o_kor,
};

const useOrderPosts = () => {
  const [searchParams] = useSearchParams();
  const setOrder = () => {
    const value = searchParams.get("order");
    if (!value) return initOrder;
    const matched = orderList.filter((item) => item.o_eng === value);
    return matched[0];
  };

  const [orderValue, setOrderValue] = useState(setOrder);
  const [showOrder, setShowOrder] = useState(false);

  useEffect(() => {
    if (!searchParams.get("pageNum")) {
      setOrderValue(initOrder);
      setShowOrder(false);
    }
  }, [searchParams, setOrderValue, setShowOrder]);

  return { orderValue, setOrderValue, showOrder, setShowOrder };
};

export default useOrderPosts;
