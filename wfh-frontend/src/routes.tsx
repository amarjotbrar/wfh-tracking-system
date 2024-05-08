import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import SysUserHome from "./pages/SysUserHome/SysUserHome";
import OrgUserHome from "./pages/OrgUserHome/OrgUserHome";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/sys/home" element={<SysUserHome />}></Route>
        <Route path="/org/home" element={<OrgUserHome />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
