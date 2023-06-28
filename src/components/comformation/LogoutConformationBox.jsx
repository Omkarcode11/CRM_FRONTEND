import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function LogoutConformationBox() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const logout = () => {
    localStorage.removeItem("CrmToken");
    localStorage.removeItem("CrmUserType");
    localStorage.removeItem("CrmUserName");
    setOpen(false);
    navigate("/");
  };

  return (
    <div>
      <Button className="btn btn-danger text-light" onClick={handleClickOpen}>
        Logout
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure for logout?"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={logout}>Logout</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
