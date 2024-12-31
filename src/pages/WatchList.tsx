import { Box, CssBaseline } from "@mui/material";
import Sidebar from "../components/Sidebar";
import MyWatchlistCard from "../components/MyWatchlistCard";

const WatchList = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <MyWatchlistCard />
      </Box>
    </Box>
  );
};
export default WatchList;
