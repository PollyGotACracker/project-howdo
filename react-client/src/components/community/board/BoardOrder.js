import { orderList } from "@hooks/community/board/useOrderPosts";
import { select, option } from "@styles/community/tailwindStyle";
import { BarsArrowDownIcon } from "@heroicons/react/24/outline";

const BoardOrder = ({
  orderValue,
  showOrder,
  setShowOrder,
  setOrderHandler,
}) => {
  return (
    <>
      <button
        className={`order-select relative w-30 ${select}`}
        onClick={() => setShowOrder(true)}
        onBlur={() => setShowOrder(false)}
      >
        <BarsArrowDownIcon className="inline-block mr-3 h-5 w-5 text-slate-500" />
        {orderValue.o_kor}
        <div
          className="flex flex-col absolute top-11 left-0 w-full bg-gray-50 rounded border border-gray-300 text-gray-900"
          style={{ display: showOrder === true ? "flex" : "none" }}
        >
          {orderList.map((order) => {
            return (
              <div
                key={order.o_eng}
                className={option}
                value={order.o_eng}
                onClick={() => setOrderHandler(order.o_eng, order.o_kor)}
              >
                {order.o_kor}
              </div>
            );
          })}
        </div>
      </button>
    </>
  );
};

export default BoardOrder;
