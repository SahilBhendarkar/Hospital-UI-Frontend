import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/logo.jpg";
import "../../styles/layout/Layout.css";

function PageLayout() {
    const { logout } = useAuth();

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-brand">
                    <img src={logo} alt="Hospital Logo" className="logo" />
                    <h3>Hospital UI</h3>
                </div>
                <nav className="sidebar-nav">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/patients">Patients</Link>
                    <Link to="/doctors">Doctors</Link>
                    <Link to="/about">About Us</Link>
                </nav>
                <button className="logout-btn" onClick={logout}>
                    Logout
                </button>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}

export default PageLayout;
