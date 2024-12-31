import { Alert } from "@mui/material";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = "72c957fb";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  listMainTitle?: string | null | undefined;
}

interface MovieState {
  movies: Movie[];
  selectedMovie: Movie | null;
  watchlist: Movie[];
  watchlistTitle: string[];
  currentSelectedTitle: string | null;
  error: string | null;
}

const initialState: MovieState = {
  movies: [],
  selectedMovie: null,
  watchlist: JSON.parse(localStorage.getItem("watchlist") || "[]"),
  watchlistTitle: JSON.parse(localStorage.getItem("watchlistTitle") || "[]"),
  currentSelectedTitle: null,
  error: null
};

export const searchMovies = createAsyncThunk<Movie[], string>(
  "movies/searchMovies",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`
      );
      if (response.data.Error) {
        return rejectWithValue(response.data.Error);
      }
      return response.data.Search;
    } catch (error: any) {
      return rejectWithValue(error.response.data.Error || "Something went wrong");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setCategoryTitle: (state, action: PayloadAction<string>) => {
      state.currentSelectedTitle = action.payload;
    },
    getMovieDetails: (state, action: PayloadAction<string>) => {
      state.selectedMovie = state.movies.find(
        (movie) => movie.imdbID === action.payload
      ) || null;
    },
    getWatchlisTitles: (state, action: PayloadAction<string>) => {
      if (!state.watchlistTitle.includes(action.payload)) {
        state.watchlistTitle.push(action.payload);
        localStorage.setItem("watchlistTitle", JSON.stringify(state.watchlistTitle));
      }
    },
    removeWatchlistTitle: (state, action: PayloadAction<string>) => {
      state.watchlistTitle = state.watchlistTitle.filter(
        (title) => title.toLowerCase() !== action.payload.toLowerCase()
      );
      localStorage.setItem("watchlistTitle", JSON.stringify(state.watchlistTitle));
    },
    addToWatchlist: (state, action: PayloadAction<Movie>) => {
      const existingItem = state.watchlist.find(
        (movie) => movie.imdbID === action.payload.imdbID
      );
      if (!existingItem) {
        state.watchlist.push({
          ...action.payload,
          listMainTitle: state.currentSelectedTitle,
        });
        localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
      }
    },
    removeFromWatchlist: (state, action: PayloadAction<Movie>) => {
      state.watchlist = state.watchlist.filter(
        (movie) => movie.imdbID !== action.payload.imdbID
      );
      localStorage.setItem("watchlist", JSON.stringify(state.watchlist));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMovies.fulfilled, (state, action) => {
      state.movies = action.payload || [];
      state.error = null;
    })
      .addCase(searchMovies.rejected, (state, action) => {
        state.error = action.payload as string; // Store error message
      });
  },
});

export const {
  getMovieDetails,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlisTitles,
  setCategoryTitle,
  removeWatchlistTitle,
} = movieSlice.actions;
export default movieSlice.reducer;
