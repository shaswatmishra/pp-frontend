import { AddPatientPageWrapper } from "./AddPatientPage.style.js";
import {
  Label,
  InputBox,
} from "../BasicInformationPage/BasicInformationPage.style.js";
import { MenuItem, Select, NativeSelect } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext.js";
const gend = ["male", "female", "Other"];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/*function convertTimeFormat(dt) {
  let tt = dt.split(":").slice(0, 1);
  let ttt = dt.split(":").slice(1, 2);
  return `${tt}:${ttt}`;
}*/

function convertTimeFormat(time) {
  if (!time) throw { message: "Invalid time" };
  const [timeValue, timeFormat] = time.split(" ");
  const [hour, min] = timeValue.split(":");

  var newTime = "";
  if ("am" === timeFormat || (timeFormat === "pm" && hour === "12")) {
    newTime = `${hour}:${min}`;
  } else {
    newTime = `${
      (timeFormat === "pm" ? 12 : 0) + Number.parseInt(hour)
    }:${min}`;
  }
  return newTime;
}

function getSlotsByDuration(date, duration, slots) {
  const newSlots = [];

  slots.forEach((slot) => {
    var start = new Date(`${date} ${slot.from}`); //2022-12-22 12:00 PM
    const last = new Date(`${date} ${slot.to}`); //Sat DEC 24 2022 13:00 PM

    var newTime = 0;
    while (last.getTime() !== newTime) {
      newTime = start.getTime() + duration * 60 * 1000; //
      if (newTime > last.getTime()) newTime = last.getTime();
      newSlots.push({
        from: convertTimeFormat(start.toTimeString()),
        to: convertTimeFormat(new Date(newTime).toTimeString()),
      });
      start = new Date(newTime);
    }
  });
  return newSlots;
}

function getDates(timings) {
  const weekDays = {
    1: "sunday",
    2: "monday",
    3: "tuesday",
    4: "wednesday",
    5: "thursday",
    6: "friday",
    7: "saturday",
  };
  const activeTimes = timings.filter((time) => time.active && time?.slots?.length);
  const dates = [];
  var days = 7;
  var startDate = new Date();
  if (activeTimes.length) {
    while (days) {
      const day = weekDays[startDate.getDay() + 1];
      if (activeTimes.find((time) => time.day === day)) {
        dates.push(startDate.toDateString());
        --days;
      }
      startDate = new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
    }
  }
  return dates;
}

const AddPatientPage = ({ handleOnChange, patientsData, clinics }) => {
  const [date, setDates] = useState([]);
  const [slotes, setSlotes] = useState([]);
  const { DisplaySnackbar } = useAuth();

  const check = () => {
    if (clinics.length === 0) {
      DisplaySnackbar("First Add Clinincs", "error");
    }
  };

  useEffect(() => {
    if (patientsData?.clinicId) {
      let datt = getDates(patientsData?.clinicId?.timings);
      setDates([...datt]);
    }
  }, [patientsData?.clinicId]);

  useEffect(() => {
    if (patientsData?.date) {
      const days = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ];

      let dtt = patientsData?.clinicId?.timings.find((time) => {
        console.log(time.day, days[new Date(patientsData?.date).getDay()]);
        return time.day === days[new Date(patientsData?.date).getDay() - 1];
      });

      if (!dtt) return;
      let sst = getSlotsByDuration(
        patientsData?.date,
        patientsData?.clinicId?.duration,
        dtt.slots
      );
      setSlotes(sst);
    }
  }, [patientsData?.date]);

  useEffect(() => {
    console.log(date);
  }, [date]);

  return (
    <AddPatientPageWrapper>
      <div className="formDiv">
        <Label>Full Name</Label>
        <InputBox
          value={patientsData?.name}
          onChange={(e) => handleOnChange(e)}
          type="text"
          name="name"
          placeholder="eg. Arun Sharma"
        />
      </div>
      <div className="formDiv">
        <Label>Phone Number</Label>
        <InputBox
          placeholder="Enter Phone Number"
          value={patientsData?.number}
          onChange={(e) => handleOnChange(e)}
          type="number"
          name="number"
        />
      </div>
      <div className="dFlex ">
        <div className="formDiv1" style={{ width: "45%" }}>
          <Label>Age</Label>
          <InputBox
            value={patientsData.age}
            onChange={(e) => handleOnChange(e)}
            placeholder="Enter Age"
            type="number"
            name="age"
          />
        </div>
        <div
          className="formDiv1"
          style={{ width: "45%", display: "flex", flexDirection: "column" }}
        >
          <Label>Gender {`(optional)`}</Label>
          <Select
            // multiple
            style={{
              marginTop: "auto",
              display: "block",
              textTransform: "capitalize",
              fontFamily: "GilroyRegular",
              fontStyle: "none",
            }}
            displayEmpty
            value={patientsData.gender}
            onChange={(e) => handleOnChange(e)}
            fullWidth
            input={<NativeSelect />}
            name="gender"
            renderValue={(selected) => {
              if (!selected) {
                return <span>Select gender</span>;
              }

              return selected;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            {/* <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem> */}
            {gend.map((name) => (
              <MenuItem
                key={name}
                style={{ textTransform: "capitalize" }}
                value={name}
              >
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="formDiv">
        <Label>Choose Clinic</Label>
        <Select
          // multiple
          onFocus={() => {
            check();
          }}
          displayEmpty
          value={patientsData.clinicId}
          onChange={(e) => handleOnChange(e)}
          fullWidth
          input={<NativeSelect />}
          name="clinicId"
          renderValue={(selected) => {
            console.log(selected);
            if (!selected) {
              return <span>Select clinic</span>;
            }

            return selected?.name;
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {/* <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem> */}
          {clinics.map((name) => (
            <MenuItem key={name?.name} value={name}>
              {name?.name}
            </MenuItem>
          ))}
        </Select>
      </div>
      <div className="dFlex ">
        <div className="formDiv1" style={{ width: "45%" }}>
          <Label>Date Slot</Label>
          <Select
            // multiple
            displayEmpty
            value={patientsData.date}
            onChange={(e) => handleOnChange(e)}
            fullWidth
            input={<NativeSelect />}
            name="date"
            renderValue={(selected) => {
              console.log(selected);
              if (!selected) {
                return <span>Select slot</span>;
              }

              return selected;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            {/* <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem> */}
            {date.map((name) => (
              <MenuItem key={name} value={name}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="formDiv1" style={{ width: "45%" }}>
          <Label>Select slot</Label>
          <Select
            // multiple
            displayEmpty
            value={patientsData?.slots}
            onChange={(e) => handleOnChange(e)}
            fullWidth
            input={<NativeSelect />}
            name="slots"
            renderValue={(selected) => {
              // console.log(selected);
              if (!selected) {
                return <span>Select date</span>;
              }

              return `${selected?.from} to ${selected.to}`;
            }}
            MenuProps={MenuProps}
            inputProps={{ "aria-label": "Without label" }}
          >
            {/* <MenuItem disabled value="">
            <em>Placeholder</em>
          </MenuItem> */}
            {slotes.map((name) => (
              <MenuItem key={name} value={name}>
                {name?.from} to {name?.to}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
    </AddPatientPageWrapper>
  );
};

export default AddPatientPage;
