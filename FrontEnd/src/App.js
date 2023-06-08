import Signup from "./components/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Protected from "./components/Protected";
import EditPost from "./components/EditPost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Protected />}>
            <Route path="/main" element={<MainPage />} />
            <Route path="/editPost/:id" element={<EditPost />} />
            <Route path="/profile/:id" element={<Profile />} />
          </Route>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
