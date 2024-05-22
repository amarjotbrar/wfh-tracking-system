//modules
import { BrowserRouter, Routes, Route } from "react-router-dom";

//components
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import SystemUserHome from "./pages/SystemUserHome/SystemUserHome";
import OrganizationUserHome from "./pages/OrganizationUserHome/OrganizationUserHome";
import OrganizationAdminPage from "./pages/OrganizationAdminPage/OrganizationAdminPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sys/home" element={<SystemUserHome />}></Route>
        <Route path="/org/home" element={<OrganizationUserHome />}></Route>
        <Route path='/org/admin' element={<OrganizationAdminPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
