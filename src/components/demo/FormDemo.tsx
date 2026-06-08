"use client";
import { useState } from "react";

export const FormDemo = () => {
  const [counter, setCounter] = useState(0);
  

  const increment = () => {
    setCounter((prev) => ++prev);
  };

  const decrement = () => {
    setCounter((prev) => --prev);
  };

  return (
    <div className="flex gap-3 item-center">
      <button
        className="rounded-sm border-4 border-indigo-500/100 p-2 bg-sky-500 hover:bg-sky-700"
        onClick={decrement}
      >
        -
      </button>
      <span className="rounded-sm border-4 border-indigo-500/100 p-1 items-center">
        {counter}
      </span>
      <button
        className="rounded-sm border-4 border-indigo-500/100 p-2 bg-sky-500 hover:bg-sky-700"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};
