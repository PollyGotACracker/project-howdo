import { useState } from "react";

export const orderList = [
  { o_eng: "latest", o_kor: "최신순" },
  { o_eng: "upvotes", o_kor: "추천순" },
  { o_eng: "replies", o_kor: "댓글순" },
  { o_eng: "views", o_kor: "조회순" },
];

export const initOrder = () => {
  const order = {
    eng: `${orderList[0].o_eng}`,
    kor: `${orderList[0].o_kor}`,
  };
  return order;
};

const useOrderPosts = () => {
  const [orderValue, setOrderValue] = useState(initOrder);
  const [showOrder, setShowOrder] = useState(false);

  return { orderValue, setOrderValue, showOrder, setShowOrder };
};

export default useOrderPosts;
