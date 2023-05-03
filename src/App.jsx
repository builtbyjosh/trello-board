import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Create from "./pages/create/Create";
import Signup from "./pages/signup/Signup";
import Project from "./pages/project/Project";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUser from "./components/OnlineUser";

function App() {
  const {user, authIsReady} = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (

        <Router>
        {user && <Sidebar />}
        <div className="container">
          <Navbar />
          <Routes>
            <Route exact path="/" element={user ? <Dashboard /> : <Navigate to="login" />} />
            <Route path="/create" element={user ? <Create /> : <Navigate to="/login" />} />
            <Route path="/projects/:id" element={user ? <Project /> : <Navigate to="/login" />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          </Routes>
        </div>
        {user && <OnlineUser />}
      </Router>
        )}
    </div>
  );
}

export default App;
