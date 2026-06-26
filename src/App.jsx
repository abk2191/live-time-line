import { useState, useEffect } from "react";

function App() {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [timeUntilBirthday, setTimeUntilBirthday] = useState({
    years: 0,
    months: 0,
    days: 0,
  });
  const [todayDate, setTodayDate] = useState("");
  const DOB = "21/12/1991";

  useEffect(() => {
    calculateAge();
    calculateTimeUntilBirthday();
    updateTodayDate();
  }, []);

  const updateTodayDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    setTodayDate(`${day}/${month}/${year}`);
  };

  const calculateAge = () => {
    const today = new Date();
    const birthParts = DOB.split("/");
    const birthDate = new Date(
      parseInt(birthParts[2]),
      parseInt(birthParts[1]) - 1,
      parseInt(birthParts[0]),
    );

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  const calculateTimeUntilBirthday = () => {
    const today = new Date();
    const birthParts = DOB.split("/");
    const birthDay = parseInt(birthParts[0]);
    const birthMonth = parseInt(birthParts[1]) - 1; // Month is 0-indexed

    // Get next birthday
    let nextBirthday = new Date(today.getFullYear(), birthMonth, birthDay);

    // If birthday already passed this year, use next year
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birthMonth, birthDay);
    }

    // Calculate difference
    let years = nextBirthday.getFullYear() - today.getFullYear();
    let months = nextBirthday.getMonth() - today.getMonth();
    let days = nextBirthday.getDate() - today.getDate();

    // Adjust for negative days
    if (days < 0) {
      months--;
      const prevMonth = new Date(
        nextBirthday.getFullYear(),
        nextBirthday.getMonth(),
        0,
      );
      days += prevMonth.getDate();
    }

    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }

    setTimeUntilBirthday({ years, months, days });
  };

  return (
    <>
      <div className="line-wrapper">
        <p>21/12/1991</p>
        <div
          className="line"
          style={{
            height: `${age.years + age.months + age.days}px`,
            backgroundColor: "#007bff",
            width: "4px",
            transition: "height 0.5s ease",
          }}
        ></div>
        <p>{age.years}</p>
        <p>{todayDate}</p>
        <p>
          Next Birthday In: {timeUntilBirthday.years} years,{" "}
          {timeUntilBirthday.months} months, {timeUntilBirthday.days} days
        </p>{" "}
        <p>
          Age: {age.years} years, {age.months} months, {age.days} days
        </p>
        <p style={{ fontSize: "12px", color: "#666" }}>
          Line height: ({age.years} + {age.months} + {age.days}) ={" "}
          {age.years + age.months + age.days}px
        </p>
        {/* Time until next birthday */}
        <div
          style={{
            borderTop: "1px solid #ddd",
            height: "2px",
            width: "350px",
            marginTop: "40px",
          }}
        ></div>
      </div>
    </>
  );
}

export default App;
