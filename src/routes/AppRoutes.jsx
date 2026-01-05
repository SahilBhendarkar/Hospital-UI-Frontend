import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Patients from "../pages/dashboard/Patients";
import Doctors from "../pages/dashboard/Doctors"; 
import PageLayout from "../components/layout/PageLayout";
import { useAuth } from "../context/AuthContext";
import About from "../pages/dashboard/About";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                {user ? (
                    <Route element={<PageLayout />}>
                        <Route index element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients" element={<Patients />} />
                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Route>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
