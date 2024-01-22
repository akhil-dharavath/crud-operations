import { useEffect, useState } from "react";
import "./App.css";
import dayjs from "dayjs";
import ButtonWrapper from "./components/ButtonWrapper";
import UpdateData from "./components/UpdateData";
import DateFieldValue from "./components/DateField";

function App() {
  const currentDate = dayjs();
  const [value, setValue] = useState(currentDate);
  const [details, setDetails] = useState([]);
  const [updating, setUpdating] = useState(false);
  const [dayFilter, setDayFilter] = useState("Sun");

  const [data, setData] = useState({
    title: "",
    description: "",
    day: "",
  });

  // update the title and description fields
  const update = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  // get day for the particular date
  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      day: value.format("ddd"),
    }));
  }, [value]);

  // add or insert data - we have same button for adding and updating
  const addData = (e) => {
    e.preventDefault();
    const getId = parseInt(localStorage.getItem("updateId"))
    const id = Date.now();

    // we check whether we are updating or adding new entry
    if (updating) {

      // filter out the updating entry
      const done = details.filter((detail) => detail.id !== getId);
      setDetails([...done, { ...data, id: getId }]);// add as new entry 
      localStorage.removeItem("updateId");
      setData({ title: "", description: "", day: "" });
      setUpdating(false);
    } else {
      setDetails([...details, { ...data, id }]);// add new entry
      setData({ title: "", description: "", day: "" }); // default empty fields
      setValue(currentDate); // default date as current date
    }
  };

  // deleting the entry
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
      
      {/* week buttons */}
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
      
      {/* filter according to days of week */}
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
