import { Box, Typography, TextField, Button, Stack } from "@mui/material";
import { searchMovies, setCategoryTitle } from "../redux/movieSlice";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

interface HeaderProps {
  setMovies: (movies: any[]) => void;
  searchText: string;
  setSearchText: (text: string) => void;
}
const Header: React.FC<HeaderProps> = ({
  setMovies,
  searchText,
  setSearchText,
}) => {
  const dispatch: Dispatch<any> = useDispatch();

  const handleSearch = async () => {
    try {
      dispatch(setCategoryTitle(searchText));
      const result: any = await dispatch(searchMovies(searchText));
      const { payload } = result;
      setMovies(payload);
    } catch (error) {
      console.error("Error searching movies:", error);
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack
        sx={{ border: "2px solid #D6ADAD", borderRadius: "5px", padding: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to <span style={{ color: "#F33F40" }}>Watchlists</span>
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2 }}>
          Browse movies, add them to watchlists and share them with friends.
        </Typography>
      </Stack>

      <Box sx={{ display: "flex", alignItems: "center" }} mt={4}>
        <TextField
          fullWidth
          label="Search Movies"
          variant="outlined"
          size="small"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{
            marginLeft: "-8px",
            backgroundColor: "#F33F40",
            padding: "8px 16px",
            textTransform: "none",
            width: "7rem",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
