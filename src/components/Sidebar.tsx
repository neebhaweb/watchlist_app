import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemText,
  TextField,
  Typography,
  Box,
  ListItem,
  Divider,
  Stack,
  IconButton,
} from "@mui/material";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { setCategoryTitle } from "../redux/movieSlice";
import LogoutModal from "./LogoutModal";
import { MovieCreation } from "@mui/icons-material";

interface UserState {
  email: string;
}

interface MovieState {
  watchlistTitle: string[];
}

interface RootState {
  user: UserState;
  movies: MovieState;
}

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const activeItem: any = "home";
  const userEmail = useSelector((state: RootState) => state.user.email);
  const watchlistTitle = useSelector((state: RootState) => state.movies.watchlistTitle);
  const movies: { listMainTitle: string }[] = JSON.parse(localStorage.getItem("watchlist") || "[]");

  const handleListItemClick = (title: string) => {
    navigate("/watchlist/" + title);
    dispatch(setCategoryTitle(title));
  };

  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
  };

  const filteredWatchlist = watchlistTitle.filter((title) => {
    return (
      movies.some((item) => item.listMainTitle === title) &&
      title.toLowerCase().includes(searchQuery.toLowerCase())
    )
  });

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #e0e0e0",
      }}
    >
      <Box
        sx={{
          width: 240,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Box>
          <Stack mb={3}>
            <Typography
              variant="h5"
              fontWeight={800}
              gutterBottom
              color="#F33F40"
              mb={2}
              sx={{ textAlign: "center" }}
            >
              Watchlists
            </Typography>

            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ marginBottom: 2, borderRadius: "4px" }}
            />
          </Stack>

          <List>
            <ListItem
              onClick={() => navigate("/search")}
              sx={{
                borderRadius: "5px",
                backgroundColor: activeItem === "home" ? "#F33F40" : "transparent",
                color: activeItem === "home" ? "#fff" : "inherit",
                cursor: "pointer",
                padding: "10px 15px",
              }}
            >
              <HouseOutlinedIcon />
              <ListItemText primary="Home" sx={{ marginLeft: 2 }} />
            </ListItem>

            <Divider sx={{ marginY: "1.5rem" }} />

            <Typography variant="subtitle1" sx={{ marginBottom: 1 }}>
              My Lists
            </Typography>

            {filteredWatchlist.map((title: string, index: number) => (
              <ListItem
                key={index}
                onClick={() => handleListItemClick(title)}
                sx={{
                  backgroundColor: activeItem === "myLists" ? "#F33F40" : "transparent",
                  color: activeItem === "myLists" ? "#fff" : "inherit",
                  border: "1px solid #898989",
                  borderRadius: "5px",
                  padding: "5px 10px",
                  cursor: "pointer",
                  marginTop: 1,
                }}
              >
                <MovieCreation />
                <Typography sx={{ color: "#898989", fontWeight: "600", ml: 0.5 }}>
                  Movies By {title}
                </Typography>
              </ListItem>
            ))}
          </List>
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          border={"1px solid"}
          borderRadius={"3px"}
          justifyContent={"space-between"}
          sx={{
            padding: 0.5,
          }}
        >
          <Box display={"flex"} alignItems={"center"}>
            <Stack
              border={"2px solid"}
              borderRadius={"16px"}
              sx={{ backgroundColor: "#E0E0E0" }}
            >
              <PersonOutlineOutlinedIcon />
            </Stack>

            <Typography ml={1}>
              {userEmail
                ? userEmail.charAt(0).toUpperCase() +
                userEmail.slice(1).toLowerCase().split("@")[0]
                : "Guest"}
            </Typography>
          </Box>

          <IconButton
            onClick={() => {
              console.log("Open Logout Modal");
              setIsOpenModal(true);
            }}
          >
            <MoreVertIcon />
          </IconButton>
        </Stack>
      </Box>
      {isOpenModal && <LogoutModal open={isOpenModal} handleClose={handleClose} />}
    </Drawer>
  );
};

export default Sidebar;
