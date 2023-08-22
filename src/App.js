import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/Landing";
import ProfilePage from "./pages/Profile";
import Posts from "./pages/Posts";
import Gallery from "./pages/Gallery";
import Todo from "./pages/Todo";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/todo" element={<Todo />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
