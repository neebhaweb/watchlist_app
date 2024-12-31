import { Provider } from "react-redux";
import store from "./redux/store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import SearchWatchlist from "./pages/SearchWatchlist";
import WatchList from "./pages/WatchList";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route 
            path="search" 
            element={
              <ProtectedRoute>
                <SearchWatchlist />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="watchlist/:id" 
            element={
              <ProtectedRoute>
                <WatchList />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
