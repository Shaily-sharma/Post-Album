import React ,{useState}from "react";
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

export default function ShowPost() {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
  };
  const { createPost } = useSelector((state) => state.datareducer);

  console.log(createPost, "=====>submitsubmitsubmitsubmit");

  return (
    <div>
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
              Added posts
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              close
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          {createPost.map((e) => {
            return (
              <div>
                <table>
                  <tr>
                    <th>Title</th>

                    <th>Body</th>
                  </tr>
                  <tr>
                    <td>{e.title}</td>

                    <td>{e.body}</td>
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
