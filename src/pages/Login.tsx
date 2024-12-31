import { Box, Button, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState } from "react";
import { login } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (email) {
      dispatch(login(email));
      navigate("/search");
    } else {
      setError("Email is required");
    }
  };

  return (
    <Box>
      <Grid container justifyContent="center" alignItems="center" sx={{ height: "100vh" }}>
        <Grid>
          <Typography variant="h4" mb={1} textAlign={'center'}>
            Login
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            size="small"
            onChange={(e) => setEmail(e.target.value)}
            error={!!error}
            helperText={error}
          />
          <Button
            fullWidth
            variant="contained"
            sx={{ backgroundColor: "#F33F40", mt: 1.5 }}
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;

