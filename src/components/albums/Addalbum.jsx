import React,{useState} from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { useSelector } from "react-redux";
import "../style.css";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Addalbum() {
  const [open, setOpen] =useState(true);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { submit } = useSelector((state) => state.albumreducer);

  console.log(submit, "=====>submitsubmitsubmitsubmit");
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Added albums
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          {submit.map((e) => {
            return (
              <div>
                <table>
                  <tr>
                    <th>Title</th>
                  </tr>
                  <tr>
                    <td>{e.title}</td>
                  </tr>
                </table>
              </div>
            );
          })}
        </div>
      </Dialog>
    </div>
  );
}
