import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Patients from "../pages/dashboard/Patients";
import PageLayout from "../components/layout/PageLayout";
import { useAuth } from "../context/AuthContext";

const AppRoutes = () => {
    const { user } = useAuth();

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                {user ? (
                    <Route element={<PageLayout />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/patients" element={<Patients />} />
                    </Route>
                ) : (
                    <Route path="*" element={<Navigate to="/" />} />
                )}
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
