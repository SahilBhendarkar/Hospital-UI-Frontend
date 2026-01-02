import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Header = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="header">
            <h2>Hospital Dashboard</h2>
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
};

export default Header;
