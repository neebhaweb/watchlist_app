import { Box, CssBaseline, Typography } from "@mui/material";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard";
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

const SearchWatchlist: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const error = useSelector((state: RootState) => state.movies.error);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, padding: 3 }}>
        <Header
          setMovies={setMovies}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        {
          error ? <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="20vh"
          >
            <Typography variant="h4" component="h1">
              {error}          </Typography>
          </Box>
            : movies.length > 0 ? (
              <MovieCard movies={movies} searchText={searchText} />
            ) : (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="20vh"
              >
                <Typography variant="h4" component="h1">
                  No Data Found
                </Typography>
              </Box>
            )
        }
      </Box>
    </Box>
  );
};

export default SearchWatchlist;
