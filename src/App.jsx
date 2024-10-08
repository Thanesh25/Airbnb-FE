import { Routes, Route } from "react-router-dom";
import "./App.css";
import IndexPages from "./Pages/IndexPage";
import LoginPage from "./Pages/LoginPage";
import Layout from "./Layout";
import RegisterPage from "./Pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./UserContext";
import PlacesPage from "./Pages/PlacesPage";
import ProfilePage from "./Pages/ProfilePage";
import PlacesFromPage from "./Pages/PlacesFormPage";
import PlacePage from "./Pages/PlacePage";
import BookingsPage from "./Pages/BookingsPage";
import BookingPage from "./Pages/BookingPage";

axios.defaults.baseURL = "https://airbnb-be-ayxh.onrender.com";
axios.defaults.withCredentials = true;
function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route index element={<IndexPages />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<PlacesPage />} />
          <Route path="/account/places/new" element={<PlacesFromPage />} />
          <Route path="/account/places/:id" element={<PlacesFromPage />} />
          <Route path="/place/:id" element={<PlacePage />} />
          <Route path="/account/bookings" element={<BookingsPage />} />
          <Route path="/account/bookings/:id" element={<BookingPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
