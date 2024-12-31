import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import DoneIcon from "@mui/icons-material/Done";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useState } from "react";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  listMainTitle?: string;
}

interface RootState {
  movies: {
    currentSelectedTitle: string | null;
    watchlist: Movie[];
  };
}

const MyWatchlistCard: React.FC = () => {
  const params = useParams<{ id: string }>();
  const { id } = params;

  const [movies, setMovies] = useState<Movie[]>(
    JSON.parse(localStorage.getItem("watchlist") || "[]")
  );
  
  const currentSelectedTitle = useSelector((state: RootState) => state.movies.currentSelectedTitle);
  
  const filteredWatchlist = movies.filter((item) => {
    return (
      item.listMainTitle?.toLowerCase() === currentSelectedTitle?.toLowerCase()
    );
  });
  
  const handleWatchlistToggle = (movie: Movie): void => {
   
    const isMovieInWatchlist = movies.find((m) => m.imdbID === movie.imdbID);

    if (isMovieInWatchlist) {
      const updatedMovies = movies.filter((m) => m.imdbID !== movie.imdbID);
      setMovies(updatedMovies);
      localStorage.setItem("watchlist", JSON.stringify(updatedMovies));
    } else {
      const updatedMovies = [...movies, movie];
      setMovies(updatedMovies);
      localStorage.setItem("watchlist", JSON.stringify(updatedMovies));
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Stack
        mb={2}
        sx={{ border: "2px solid #D6ADAD", borderRadius: "5px", padding: 2 }}
      >
        <Typography variant="h4" fontWeight={"bold"} gutterBottom>
          Movies By {id}
        </Typography>
        <Typography
          variant="body1"
          fontWeight={"bold"}
          sx={{ marginBottom: 2 }}
        >
          About this watchlist{" "}
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {filteredWatchlist.length > 0 &&
          filteredWatchlist.map((movie) => (
            <Grid size={{xs:12, sm:6, md:4, lg:3}} key={movie.imdbID}>
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
                <Box position="absolute" right={0}>
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={() => handleWatchlistToggle(movie)}
                  >
                    {filteredWatchlist.some(
                      (item) => item.imdbID === movie.imdbID
                    ) ? (
                      <DoneIcon sx={{ color: "white" }} fontSize="large" />
                    ) : (
                      <DoneIcon sx={{ color: "#F33F40" }} fontSize="large" />
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
                    {'('+movie.Year+')'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default MyWatchlistCard;
