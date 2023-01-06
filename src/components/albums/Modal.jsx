import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

import { useEffect } from "react";
import { getedit } from "../../Redux/Album/actions/index";

export default function Modal() {
  const user = useSelector((state) => state.albumreducer.editbut);
  console.log(user, "??/");
  const [open, setOpen] = useState(true);
  const [edit, setEdit] = useState(user, { title: "", body: "" });

  useEffect(() => {
    if (user[0]) setEdit(user[0]);
  }, [user]);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEdit({ ...edit, [e.target.name]: e.target.value });
  };

  const handleEditSave = (id, data) => {
    console.log(data, id);
    dispatch(getedit(data, id));
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleReset = () => {
    setEdit({
      title: "",
      body: "",
    });
  };

  return (
    <div className="form">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Edit Form"}</DialogTitle>
        <DialogContent>
          <form style={{ backgroundcolor: "aqua" }}>
            <div>
              <div className="space">
                <p>Title:</p>
                <input
                  style={{
                    border: "1px solid black",
                    borderRadius: "5px",
                    height: "4rem",
                  }}
                  className="input"
                  name="title"
                  value={edit.title}
                  onChange={(e) => handleChange(e)}
                />
              </div>
            </div>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleEditSave(edit.id, edit)}>Save</Button>
          <Button onClick={handleClose}>close</Button>
          <Button onClick={handleReset}>reset</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
