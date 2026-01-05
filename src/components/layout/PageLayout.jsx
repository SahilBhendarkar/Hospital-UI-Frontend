import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/layout/Layout.css";

function PageLayout() {
    const { logout } = useAuth();

    return (
        <div className="layout">
            <aside className="sidebar">
                <img src="Day-20\src\assets\v987-18a.jpg" className="logo"></img>
                <h3>Hospital UI</h3>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/patients">Patients</Link>
                <Link to="/doctors">Doctors</Link>
                <Link to="/about">About Us</Link>
                <button onClick={logout}>Logout</button>
            </aside>

            <main className="content">
                <Outlet />
            </main>
        </div>
    );
}

export default PageLayout;
