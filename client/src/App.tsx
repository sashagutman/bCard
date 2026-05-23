import { Routes, Route } from "react-router-dom";
import Register from "./components/register/Register";
import Login from "./components/Login";
import Bcards from "./components/Bcards";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import CardDetails from "./components/CardDetails";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./context/AuthContext";
import FavCards from "./components/FavCards";
import ProfileCard from "./components/ProfileCard";
import MyCard from "./components/createCard/MyCard";
import NewCard from "./components/createCard/NewCard";
import EditCard from "./components/EditCard";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <>
      <ToastContainer />
      <AuthProvider>
      <div className="layout">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Bcards />} />
            <Route path="/about" element={<About />} />
            <Route path="/fav-cards" element={<FavCards />} />
            <Route path="/profile" element={<ProfileCard />} />
            <Route path="/my-cards" element={<MyCard />} />
            <Route path="/new-card" element={<NewCard />} />
            <Route path="/edit-card/:id" element={<EditCard />}/>
            <Route path="/edit-profile" element={<EditProfile />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/CardDetails/:cardId" element={<CardDetails />} />
          </Routes>
        </div>
        <Footer />
      </div>
      </AuthProvider>
    </>
  );
}

export default App;

