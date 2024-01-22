import React from "react";

const ButtonWrapper = ({ day, onClick, dayFilter }) => {
  const active = day.toLowerCase() === dayFilter.toLowerCase();
  return (
    <button
      style={{
        padding: 10,
        background: active ? "darkgray" : "",
        cursor: "pointer",
      }}
      onClick={() => onClick()}
    >
      {day}
    </button>
  );
};

export default ButtonWrapper;
