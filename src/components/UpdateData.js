import React from "react";

const UpdateData = ({ data, details, setDetails, onClick }) => {
  const deleteData = (e) => {
    e.preventDefault();
    setDetails(details.filter((detail) => detail.id !== data.id));
  };

  return (
    <div className="delete">
      <div>
        <h1>{data.title}</h1>
        <p>{data.description}</p>
      </div>
      <div>
        <button onClick={() => onClick()} style={{ marginRight: 5 }}>
          EDIT
        </button>
        <button onClick={(e) => deleteData(e)}>DELETE</button>
      </div>
    </div>
  );
};

export default UpdateData;
