import React from "react";
import { useDispatch, useSelector, useSelectorR18 } from "./react-redux";

export default function FuncRedux() {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.count);
  const countR18 = useSelectorR18((state) => state.count);

  return (
    <div style={{ borderTop: "1px dashed black", margin: "12px" }}>
      <h1>Count: {count}</h1>
      <h1>countR18: {countR18}</h1>

      <button
        onClick={() =>
          dispatch({
            type: "INCREMENT",
          })
        }
      >
        Increment
      </button>
    </div>
  );
}
