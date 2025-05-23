import 'swiper/css'; 
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import "./App.scss";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
function App() {
  // const [count, setCount] = useState(0)

  const Home = lazy(() => import("./pages/Home"));
  const MoviePage = lazy(() => import("./pages/MoviePage"));
  const MovieDetails = lazy(() => import("./pages/MovieDetails"));
  const TvShowsPage = lazy(() => import("./pages/TvShowsPage"));
  const TvDetails = lazy(() => import("./pages/TvDetails"));
  const SearchPage = lazy(() => import("./pages/SearchPage"));
  const WatchList = lazy(() => import("./pages/WatchList"));
  const Login = lazy(() => import("./pages/Login"));
  const Register = lazy(() => import("./pages/Register"));
  const NotFound = lazy(() => import("./pages/NotFound"));

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />

          <Suspense
            fallback={<div className="text-center mt-5">Loading...</div>}
          >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/movies" element={<MoviePage />} />
              <Route path="/movies/:id" element={<MovieDetails />} />

              <Route path="/tvShows" element={<TvShowsPage />} />
              <Route path="/tvShows/:id" element={<TvDetails />} />

              <Route path="/search" element={<SearchPage />} />

              <Route path="/watchlist" element={<WatchList />} />

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
