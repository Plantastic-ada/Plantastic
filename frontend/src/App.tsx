import { Routes, Route } from "react-router-dom";
import Login from "./services/Login";
import Home from "./services/Home";
import SignUp from "./services/SignUp";
import ProtectedRoutes from "./utils/ProtectedRoutes";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
