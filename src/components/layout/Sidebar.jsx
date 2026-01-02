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
            </ul>
        </aside>
    );
};

export default Sidebar;
