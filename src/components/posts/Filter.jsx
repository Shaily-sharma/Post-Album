import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setPersonName, setResult } from "../../Redux/Post/actions";
import "../style.css";

export default function Filter() {
  const { userList, filterName } = useSelector((state) => state.datareducer);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setPersonName(event.target.value));
    dispatch(setResult(true));
  };

  return (
    <div align="center">
      <FormControl sx={{ width: "20%", marginTop: "1rem" }}>
        <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filterName}
          label="search"
          onChange={handleChange}
        >
          {userList &&
            userList.map((item, index) => (
              <MenuItem value={item.id}>{item.name}</MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
