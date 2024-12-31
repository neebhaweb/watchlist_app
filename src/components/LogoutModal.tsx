import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/userSlice";

interface LogoutModalProps {
  open: boolean;
  handleClose: () => void;
}

const LogoutModal: React.FC<LogoutModalProps> = ({ open, handleClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogout = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: { lg: "500px" },
          maxWidth: "80%",
        },
      }}
    >
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onLogout} color="secondary">
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default LogoutModal;
