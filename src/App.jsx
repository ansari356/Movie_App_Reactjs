import 'swiper/css'; 
import './assets/boxicons-2.0.7/css/boxicons.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "./App.scss";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Loading from './components/loading/Loading';
import Home from './pages/Home';
function App() {
  // const [count, setCount] = useState(0)

  const Home = lazy(() => import("./pages/Home"));
  const MoviePage = lazy(() => import("./pages/MoviePage"));
  const MovieDetails = lazy(() => import("./pages/MovieDetails"));
  const TvShowsPage = lazy(() => import("./pages/TvShowsPage"));
  const TvDetails = lazy(() => import("./pages/TvDetails"));
  const WatchList = lazy(() => import("./pages/WatchList"));
  // const Login = lazy(() => import("./pages/Login"));
  // const Register = lazy(() => import("./pages/Register"));
  const NotFound = lazy(() => import("./pages/NotFound"));

  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <Header />
          <Suspense
            fallback={<Loading/>}
          >
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/movies" element={<MoviePage />} />
              <Route path="/movie/:id" element={<MovieDetails />} />

              <Route path="/tvShows" element={<TvShowsPage />} />
              <Route path="/tv/:id" element={<TvDetails />} />


              <Route path="/watchlist" element={<WatchList />} />

              {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}

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
