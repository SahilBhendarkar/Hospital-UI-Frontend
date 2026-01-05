import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard/patients">Patients</Link>
                </li>
                <li>
                    <Link to="/dashboard/doctors">Doctors</Link>
                </li>
                <li>
                    <Link to="/dashboard/about">About Us</Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
