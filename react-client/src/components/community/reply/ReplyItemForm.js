import { useState } from "react";
import { btnOutline, inputReply } from "@styles/community/tailwindStyle";
import { usePostContext } from "@contexts/PostContextProvider";
import { useUserContext } from "@contexts/UserContextProvider";
import { getReply, insertReply } from "@services/post.service";
import UserProfile from "@components/community/post/UserProfile";

const ReplyItemForm = ({ item, index }) => {
  const { userSession } = useUserContext();
  const { initReply, setReplyList, setReplyCount } = usePostContext();
  const [cReplyInput, setCReplyInput] = useState(initReply);
  const [inputValues, setInputValues] = useState([]);
  const isNotLogin = !userSession?.username;

  const changeCReplyHandler = (event, index) => {
    const values = [...inputValues];
    values[index] = event.target.value;
    setInputValues(values);
  };

  const submitCReplyHandler = async (index) => {
    setCReplyInput(async (reply) => {
      reply = {
        ...cReplyInput,
        username: userSession?.username,
        p_code: item.p_code,
        r_content: inputValues[index],
        r_parent_code: item.r_code,
      };
      await insertReply(reply);
      let data = await getReply(reply.p_code);
      if (data) {
        setReplyList([...data.list]);
        setReplyCount(data.count);
        setInputValues([]);
        window.alert("댓글이 등록되었습니다.");
      }
      return initReply;
    });
  };

  return (
    <div
      className="reply-input-box gap-3 w-full p-5 my-5 border border-gray-300 rounded"
      style={{
        display: userSession?.username && item.r_content ? "flex" : "none",
      }}
    >
      <UserProfile
        imageSrc={userSession?.profile_image}
        nickname={userSession?.nickname}
      />
      <input
        className={inputReply}
        onChange={(event) => changeCReplyHandler(event, index)}
        value={inputValues[index] || ""}
        placeholder={
          isNotLogin ? "로그인 후 이용해주세요." : "댓글을 입력하세요."
        }
        disabled={isNotLogin ? true : false}
      />
      <button
        className={btnOutline}
        disabled={isNotLogin || inputValues[index] < 1}
        onClick={() => submitCReplyHandler(index)}
      >
        등록
      </button>
    </div>
  );
};

export default ReplyItemForm;

/**
 * cf) Array.map 을 이용해 생성한 동일 컴포넌트 input 의 state 관리법
 *   단순히 event.target.value 를 저장할 경우
 *   모든 input 의 값이 동일하게 처리되는 문제 발생
 * 1. Array.map 에서 각 input 의 index 를 props 로 전달
 * 2. 별도의 배열 state변수를 생성
 * 3. input 의 value 를 배열 state변수[index] 로 지정
 * 4. onChange 시 event 와 함께 callback 함수 호출
 * 5. 해당 callback 내에서 eventHandler를 event, index 와 함께 다시 callback 호출
 * 6. handler에서는 변수를 별도로 생성하여 배열 state변수를 spread(배열 복사)
 * 7. 새로 생성된 배열 변수의 index 에 해당하는 값에 event.target.value 저장
 * 8. setState의 인수로 새로운 배열 변수를 넘겨줌
 *    만약 3번째 input 에 값이 입력되면 [undefined, undefined, "문자열"] 이 저장됨
 */

/**
 * cf) setState 내에서 callback 실행: Function Updater
 * 매개변수는 현재 state 값, callback 에서 return 되는 값은 state 에 저장될 값
 * state 값이 setting 되기 전에 함수가 먼저 호출되는 문제를 해결할 수 있다.
 *  저장할 값을 변수로 선언하고 fetch 함수를 호출한다.
 */

// cf) 함수의 코드가 전부 실행된 이후에 state의 값이 변경된다.
// cf) eventHandler 에 값을 전달해야 할 경우 중첩 callback 을 사용해야 한다.
