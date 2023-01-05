import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { cre } from "../../Redux/Album/actions/index";
import { useDispatch } from "react-redux";

export default function Alertt() {
  const [open, setOpen] = useState(true);
  const [data, setData] = useState({ title: "" });

  const dispatch = useDispatch();
  const onChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(cre([data]));
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <form action=" " className="form">
              <div>
                <div>
                  <label className="labell_" htmlFor="title">
                    {" "}
                    Title:
                  </label>
                  <input
                    className="input_stylee"
                    type="text"
                    name="title"
                    autoComplete="off"
                    onChange={(e) => onChange(e)}
                  />
                </div>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
