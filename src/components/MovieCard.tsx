import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import BookmarkRemoveOutlinedIcon from "@mui/icons-material/BookmarkRemoveOutlined";

import { RootState } from "../redux/store";
import {
  addToWatchlist,
  removeFromWatchlist,
  getWatchlisTitles,
  setCategoryTitle,
} from "../redux/movieSlice";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  listMainTitle?: string | undefined;
}

interface MovieCardProps {
  movies: Movie[];
  searchText: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ movies, searchText }) => {
  const dispatch = useDispatch();
  const watchlist = useSelector((state: RootState) => state.movies.watchlist);

  const isInWatchlist = (movie: Movie) => {
    return watchlist?.some((item) => item.imdbID === movie.imdbID);
  };
  const handleWatchlistToggle = (movie: Movie) => {
    if (isInWatchlist(movie)) {
      dispatch(removeFromWatchlist(movie));
      dispatch(setCategoryTitle(movie.listMainTitle || ""));
    } else {
      dispatch(addToWatchlist(movie));
      dispatch(getWatchlisTitles(searchText));
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Grid container spacing={2}>
        {movies?.map((movie: any) => (
          <Grid size={{xs:12, sm:6, md:4, lg:3}} key={movie.imdbID} component="div">
            <Card
              sx={{
                maxWidth: 200,
                height: 385,
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box position="absolute">
                <IconButton
                  sx={{
                    padding: 0,
                    backgroundColor: "#2F322D",
                    color: "#DEDEDD",
                    borderRadius: 0,
                  }}
                  onClick={() => handleWatchlistToggle(movie)}
                >
                  {isInWatchlist(movie) ? (
                    <BookmarkRemoveOutlinedIcon fontSize={"large"} />
                  ) : (
                    <BookmarkAddOutlinedIcon fontSize={"large"} />
                  )}
                </IconButton>
              </Box>
              <CardMedia
                component="img"
                height="300"
                image={movie.Poster}
                alt={movie.Title}
              />
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "auto",
                }}
              >
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  color="text.secondary"
                  gutterBottom
                  sx={{ whiteSpace: "normal", overflow: "visible" }}
                >
                  {movie.Title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.Year}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MovieCard;
