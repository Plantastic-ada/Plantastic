import { Routes, Route } from "react-router-dom";
import Login from "./services/Login";
import Home from "./services/Home";
import SignUp from "./services/SignUp";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Encyclopedia from "./services/Encyclopedia";
import Advices from "./services/Advices";
import Forum from "./services/Forum";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path="/advices" element={<Advices />} />
          <Route path="/forum" element={<Forum />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
