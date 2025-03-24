import { useEffect, useState, useRef } from "react";
import {
  ClinincsWrapper,
  Add,
  ClinicData,
  TableHeaderContainer,
  TableHeader,
  TableContent,
  TableData,
  Line,
  TimeRangeInput,
  TimeSlot,
} from "./Clinics.style";
import BackIconSvg from "../../Svg/BackIcon.svg";
import {
  Label,
  InputBox,
} from "../BasicInformationPage/BasicInformationPage.style";
import Switch from "@mui/material/Switch";
import EditIcon from "../../Svg/EditIcon";

// import TimePicker from 'react-time-picker';
import { Button } from "../LoginPage/LoginPage.style";
import { useNavigate } from "react-router-dom";
// import { from '../PreviousAppointment/PreviousAppointment.style';

// import { async } from '@firebase/util';
import { Clinics } from "../../Api/Api";
import DeleteIconSvg from "../../Svg/DeleteIconSvg";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import Loader from "../../Components/Loading/ExportLoader";

// import { Unstable_NextTimePicker as TimeRangePicker } from '@mui/x-date-pickers/NextTimePicker';

function ClinicsPage() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { idToken, DisplaySnackbar } = useAuth();
  const [clinicAvailable, setClinicAvailable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [render, setRender] = useState(false);
  const [editId, setEditId] = useState("");
  const [isEdit, setEdit] = useState(false);

  const [clinicData, setClinicData] = useState({
    name: "",
    address: "",
    clinicType: "physical",
    patients: "",
    fees: "",
    duration: "",
  });
  const [active, setActive] = useState({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  });

  const handleSetTime = (input, day) => {
    //store input el in reference
    timeVal.current[day][input.target.name] = input;
  };

  const timeVal = useRef({
    monday: {},
    tuesday: {},
    wednesday: {},
    thursday: {},
    friday: {},
    saturday: {},
    sunday: {},
  });

  const [timings, setTimings] = useState([]);
  const handleOnChange = (e) => {
    setClinicData({ ...clinicData, [e.target.name]: e.target.value });
  };
  const handleActive = (e) => {
    setActive({ ...active, [e]: !active[e] });
    if (active[e]) {
      setTimings(timings.filter((item) => item?.day !== e));
    } else {
      setTimings([...timings, { day: e, active: true, slots: [] }]);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const dt = await axios.get(Clinics.getdata, {
          headers: {
            firebasetoken: idToken,
          },
        });
        setClinicAvailable(dt?.data?.data?.clinics);
      } catch (err) {
        console.log(err);
      }
    };

    getData();
  }, [render]);
  useEffect(() => {
    if (checked) {
      setClinicData({ ...clinicData, clinicType: "virtual" });
    } else {
      setClinicData({ ...clinicData, clinicType: "physical" });
    }
  }, [checked]);

  const handleEdit = (data) => {
    setEditId(data?._id);
    let dt = {};
    if (data?.clinicType === "virtual") {
      clinicData.clinicType = "virtual";
      setChecked(true);
    } else {
      clinicData.clinicType = "physical";
      setChecked(false);
    }
    clinicData.name = data?.name;
    clinicData.fees = data?.fees;
    clinicData.address = data?.address;
    clinicData.duration = data?.duration;
    setClinicData({ ...clinicData });
    const dtt = [];
    data?.timings?.forEach((item) => {
      if (item?.active) {
        dtt.push(item);
      }
      active[item?.day] = item?.active;
    });
    setActive({ ...active });
    setTimings([...dtt]);
    setEdit(true);
  };

  const getTime = (time) => {
    return new Date(`1999 01 01 ${time}`).getTime();
  };
  //add new slot in day timings
  function addSlots(key) {
    if (!clinicData.duration) {
      DisplaySnackbar(
        "Please Provide duration before creating Time Slots!",
        "error"
      );
      return;
    }
    const { from, to } = timeVal.current[key];

    if (!from.target.value || !to.target.value) {
      DisplaySnackbar("Please Provide Time!", "error");
      return;
    }

    if (
      (to.target.valueAsNumber - from.target.valueAsNumber) / (1000 * 60) <
      Number.parseInt(clinicData.duration)
    ) {
      DisplaySnackbar(
        "Please select time slot greater than or equal to provided duration",
        "error"
      );
      return;
    }

    const [fromH, fromM] = new Date(from.target.valueAsDate)
      .toISOString()
      .split("T")[1]
      .split(":");
    const [toH, toM] = new Date(to.target.valueAsDate)
      .toISOString()
      .split("T")[1]
      .split(":");

    const dayIndex = timings.findIndex((time) => time.day === key);

    if (dayIndex === -1) {
      DisplaySnackbar("first Active the day", "error");
      return;
    }

    //validate time before pushing in slot array
    /**
     * conditions
     * i. from and to should be duplicate [14:00 - 15:00] [14:00 - 15:00] X
     * ii. from and to should not come in between already selected time slot [14:00 - 15:00] [14:00 - 14:30] X
     */

    const newSlot = {
      from: `${fromH}:${fromM}`,
      to: `${toH}:${toM}`,
    };
    const status = {
      eligible: true,
      message: "",
    };
    for (let slot of timings[dayIndex].slots) {
      try {
        //check duplicate time slot
        if (slot.from === newSlot.from && slot.to === newSlot.to) {
          throw { message: "Selected Time Slot already exists!" };
        }
        //check overlapping time slot
        if (
          getTime(slot.from) < getTime(newSlot.from) &&
          getTime(newSlot.from) < getTime(slot.to)
        ) {
          throw {
            message:
              "Please choose another time, start time is conflicting with previuosly selected time slot!",
          };
        }

        if (
          getTime(slot.from) < getTime(newSlot.to) &&
          getTime(newSlot.to) < getTime(slot.to)
        ) {
          throw {
            message:
              "Please choose another time, end time is conflicting with previuosly selected time slot!",
          };
        }
      } catch (err) {
        status.eligible = false;
        status.message = err.message;
        break;
      }
    }

    if (!status.eligible) {
      DisplaySnackbar(status.message, "error");
      return;
    }

    timings[dayIndex].slots.push(newSlot);
    setTimings([...timings]);

    DisplaySnackbar("Added", "success");

    //clear input
    timeVal.current[key].from.target.value = "";
    timeVal.current[key].to.target.value = "";
  }
  //   console.log(timeVal);
  const handleEditClick = async () => {
    try {
      setLoading(true);
      let data = { ...clinicData };
      data.timings = timings;
      const dt = await axios.patch(
        Clinics.editClinic(editId),
        {
          ...data,
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      setLoading(false);
      console.log(dt);
      if (dt?.data?.status === "success") {
        DisplaySnackbar("Edit Success", "success");
        setClinicData({
          name: "",
          address: "",
          clinicType: "physical",
          patients: "",
          fees: "",
          duration: "",
        });
        setActive({
          monday: false,
          tuesday: false,
          wednesday: false,
          thrusday: false,
          friday: false,
          saturday: false,
          sunday: false,
        });
        setEdit(false);
        setEditId("");
        setTimings([]);
      }
      setRender(!render);
    } catch (err) {
      setLoading(false);
      console.log(err);
      DisplaySnackbar(err?.response?.data?.message, "error");
    }
  };
  const handleClick = async () => {
    try {
      setLoading(true);
      let data = { ...clinicData };
      data.timings = timings;

      const dt = await axios.post(
        Clinics.addClinic,
        {
          ...data,
        },
        {
          headers: {
            firebasetoken: idToken,
          },
        }
      );
      DisplaySnackbar("added", "success");
      setLoading(false);
      setRender(!render);
      //   console.log(dt);
    } catch (err) {
      DisplaySnackbar(err?.response?.data?.message, "error");
      console.log(err);
    }
    setLoading(false);
  };

  //remove slot from selected day
  const handleDeletion = (day, id) => {
    setTimings(
      timings?.map((item) => {
        if (item?.day === day) {
          return {
            ...item,
            slots: item?.slots?.filter((itm, idx) => idx !== id),
          };
        }
        return item;
      })
    );
  };

  return (
    <ClinincsWrapper>
      <div className="heading">
        <div onClick={() => navigate(-1)} className="icon">
          <BackIconSvg />
        </div>
        <h2>Manage Clinic</h2>
      </div>

      <ClinicData>
        <TableHeaderContainer>
          <TableHeader md>Name</TableHeader>
          <TableHeader style={{ margin: "0px 5px" }} lg>
            Address
          </TableHeader>
          <TableHeader sm>Fees</TableHeader>
          <TableHeader style={{ width: "30%", marginLeft: "auto" }} md>
            Clinic Type
          </TableHeader>
          <TableHeader sm></TableHeader>
        </TableHeaderContainer>
        {clinicAvailable.length ? (
          clinicAvailable.map((item) => {
            return (
              <div>
                <TableContent>
                  <TableData md>{item?.name}</TableData>
                  <TableData style={{ margin: "0px 5px" }} lg>
                    {item?.address}
                  </TableData>
                  <TableData sm>{item?.fees}</TableData>
                  <TableData style={{ width: "30%", marginLeft: "auto" }} md>
                    {item?.clinicType}
                  </TableData>
                  <TableData onClick={() => handleEdit(item)} sm>
                    <EditIcon />
                  </TableData>
                </TableContent>
                <Line />
              </div>
            );
          })
        ) : (
          <p
            style={{
              fontSize: "1.3rem",
              textAlign: "center",
              color: "grey",
              padding: "100px 30px",
              fontFamily: "GilroyRegular",
            }}
          >
            Create Clinic
          </p>
        )}
      </ClinicData>

      <div className="formContainer">
        <h2>Add New Clinic</h2>
        <div>
          <Label>Clinic Name</Label>
          <InputBox
            value={clinicData.name}
            onChange={(e) => handleOnChange(e)}
            name="name"
            type="text"
            placeholder="Enter clinic Name"
          />
        </div>
        <div>
          <Label>Address</Label>
          <InputBox
            value={clinicData.address}
            onChange={(e) => handleOnChange(e)}
            name="address"
            type="text"
            placeholder="Enter address"
          />
        </div>
        <div>
          <Label>Fees</Label>
          <InputBox
            value={clinicData.fees}
            onChange={(e) => handleOnChange(e)}
            name="fees"
            type="number"
            placeholder="Enter fees"
          />
        </div>
        <div>
          <>
            <Label>Duration</Label>
            <InputBox
              value={clinicData.duration}
              onChange={(e) => handleOnChange(e)}
              name="duration"
              type="number"
              placeholder="in min"
            />
          </>
          {/*checked ? (
            <>
              <Label>Duration</Label>
              <InputBox
                value={clinicData.duration}
                onChange={(e) => handleOnChange(e)}
                name="duration"
                type="number"
                placeholder="in min"
              />
            </>
          ) : (
            <>
              <Label>No. of Patients</Label>
              <InputBox
                value={clinicData.patients}
                onChange={(e) => handleOnChange(e)}
                name="patients"
                type="number"
                placeholder=""
              />
            </>
          )*/}
        </div>
        {!editId ? (
          <div>
            <Switch onChange={() => setChecked(!checked)} checked={checked} />{" "}
            <span style={{ fontSize: "1.2rem" }}>This is an online clinic</span>
          </div>
        ) : (
          ""
        )}
        {/* <Line/> */}
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Monday</span>
              <Switch
                onChange={() => handleActive("monday")}
                checked={active?.monday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onClick={(e) => handleSetTime(e, "monday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onClick={(e) => handleSetTime(e, "monday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("monday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "monday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("monday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Tuesday</span>
              <Switch
                onChange={() => handleActive("tuesday")}
                checked={active?.tuesday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onClick={(e) => handleSetTime(e, "tuesday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onClick={(e) => handleSetTime(e, "tuesday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("tuesday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "tuesday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("tuesday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Wednesday</span>
              <Switch
                onChange={() => handleActive("wednesday")}
                checked={active?.wednesday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onClick={(e) => handleSetTime(e, "wednesday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onClick={(e) => handleSetTime(e, "wednesday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("wednesday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "wednesday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("wednesday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Thursday</span>
              <Switch
                onChange={() => handleActive("thursday")}
                checked={active?.thursday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onClick={(e) => handleSetTime(e, "thursday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onClick={(e) => handleSetTime(e, "thursday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("thursday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "thursday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("thursday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Friday</span>
              <Switch
                onChange={() => handleActive("friday")}
                checked={active?.friday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onClick={(e) => handleSetTime(e, "friday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onClick={(e) => handleSetTime(e, "friday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("friday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "friday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("friday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Saturday</span>
              <Switch
                onChange={() => handleActive("saturday")}
                checked={active?.saturday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onClick={(e) => handleSetTime(e, "saturday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onClick={(e) => handleSetTime(e, "saturday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("saturday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "saturday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("saturday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <TimeSlot>
          <div className="time">
            <div className="day">
              <span>Sunday</span>
              <Switch
                onChange={() => handleActive("sunday")}
                checked={active?.sunday}
              />
            </div>
            <div className="slot-form">
              <TimeRangeInput>
                <div className="time-input">
                  <label>From</label>
                  <input
                    type="time"
                    name="from"
                    onChange={(e) => handleSetTime(e, "sunday")}
                  />
                </div>
                <div className="time-input">
                  <label>To</label>
                  <input
                    type="time"
                    name="to"
                    onChange={(e) => handleSetTime(e, "sunday")}
                  />
                </div>
              </TimeRangeInput>
              <Add
                onClick={() => {
                  addSlots("sunday");
                }}
              >
                Add
              </Add>
            </div>
          </div>
          <div className="slots">
            {timings?.map((item) => {
              if (item?.day === "sunday") {
                return (
                  <>
                    {item?.slots?.map((ite, id) => {
                      return (
                        <div className="flxd">
                          <p>
                            {ite?.from} to {ite?.to}
                          </p>
                          <div onClick={() => handleDeletion("sunday", id)}>
                            <DeleteIconSvg />
                          </div>
                        </div>
                      );
                    })}
                  </>
                );
              }
              return "";
            })}
          </div>
        </TimeSlot>
        <Line />
        <div>
          <Button
            onClick={() => {
              isEdit ? handleEditClick() : handleClick();
            }}
            style={{ width: "50%", margin: "0 auto" }}
          >
            Save
          </Button>
        </div>
      </div>

      {loading && <Loader />}
    </ClinincsWrapper>
  );
}

export default ClinicsPage;
