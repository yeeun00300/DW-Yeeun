import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    // 위에 쓴 ...args는 함수 문법에서 사용하는 args이고
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
      //여기 쓴 ...args는 스프레드 연산자
    } catch (error) {
      setError(error);
      return;
    } finally {
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}

export default useAsync;
