import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import ButtonWrapper from "./components/ButtonWrapper";
import UpdateData from "./components/UpdateData";
import DateFieldValue from "./components/DateField";

function App() {
  const currentDate = dayjs();
  const [value, setValue] = useState(currentDate);

  const [data, setData] = useState({
    title: "",
    description: "",
    day: "",
  });
  const update = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      day: value.format("ddd"),
    }));
  }, [value]);

  const [details, setDetails] = useState([]);
  const [updating, setUpdating] = useState(false);

  const addData = (e) => {
    e.preventDefault();
    const getId = localStorage.getItem("updateId");
    const id = Date.now();
    if (updating) {
      const done = details.filter((detail) => detail.id !== getId);
      setDetails([done, { ...data, id: getId }]);
      localStorage.removeItem("updateId");
      setUpdating(false);
      console.log("clicked");
      setData({ title: "", description: "", day: "" });
    } else {
      setDetails([...details, { ...data, id }]);
      setData({ title: "", description: "", day: "" });
      setValue(currentDate);
    }
  };

  const [dayFilter, setDayFilter] = useState("Sun");

  const updateDetail = (id) => {
    const update = details.filter((detail) => detail.id === id)[0];
    localStorage.setItem("updateId", update.id);
    setData(update);
    setUpdating(true);
  };

  return (
    <div className="mainDiv">
      <form onSubmit={(e) => addData(e)}>
        <div>
          <input
            className="title"
            placeholder="Title"
            name="title"
            value={data.title}
            onChange={(e) => update(e)}
            required
          />
          {/* <input
            type="date"
            name="date"
            value={data.date}
            onChange={(e) => update(e)}
          /> */}
          <DateFieldValue value={value} setValue={setValue} />
        </div>
        <div>
          <input
            className="description"
            placeholder="Description"
            name="description"
            value={data.description}
            onChange={(e) => update(e)}
          />
          <button type="submit">SAVE</button>
        </div>
      </form>
      <div className="buttons">
        <ButtonWrapper
          day="SUN"
          onClick={() => setDayFilter("Sun")}
          dayFilter={dayFilter}
        />
        <ButtonWrapper
          day="MON"
          onClick={() => setDayFilter("Mon")}
          dayFilter={dayFilter}
        />
        <ButtonWrapper
          day="TUE"
          onClick={() => setDayFilter("Tue")}
          dayFilter={dayFilter}
        />
        <ButtonWrapper
          day="WED"
          onClick={() => setDayFilter("Wed")}
          dayFilter={dayFilter}
        />
        <ButtonWrapper
          day="THU"
          onClick={() => setDayFilter("Thu")}
          dayFilter={dayFilter}
        />
        <ButtonWrapper
          day="FRI"
          onClick={() => setDayFilter("Fri")}
          dayFilter={dayFilter}
        />
        <ButtonWrapper
          day="SAT"
          onClick={() => setDayFilter("Sat")}
          dayFilter={dayFilter}
        />
      </div>
      <div className="updates">
        {details.length > 0
          ? details
              .filter((data) => data.day === dayFilter)
              .map((data) => (
                <UpdateData
                  key={data.id}
                  data={data}
                  details={details}
                  setDetails={setDetails}
                  onClick={() => updateDetail(data.id)}
                />
              ))
          : ""}
      </div>
    </div>
  );
}

export default App;
