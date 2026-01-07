import { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import "../../styles/pages/Dashboard.css";
import { THEME_LIST, themes } from "../../theme/theme";
import Button from "../../components/common/Button";


const StatCard = styled.div`
        background: ${({ theme }) => theme.bgCard};
        border: 1px solid ${({ theme }) => theme.border};
        border-radius: ${({ theme }) => theme.radius};
        padding: 2.5rem 2rem;
        text-align: center;
        box-shadow: ${({ theme }) => theme.shadow};
        transition: transform 0.3s ease, box-shadow 0.3s ease;

        &:hover {
            transform: translateY(-10px);
        }

        h3 {
            font-size: 0.85rem;
            text-transform: uppercase;
            color: #64748b;
            letter-spacing: 0.1em;
            margin-bottom: 1rem;
        }

        p {
            font-size: 3rem;
            font-weight: 800;
            background: ${({ theme }) => theme.primary};
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    `;

const DashboardHeader = styled.header`
        height: 80px;
        background: ${({ theme }) => theme.card};
        backdrop-filter: blur(20px);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 2rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.3);
        position: sticky;
        top: 0;
        z-index: 20;
        box-shadow: 0 8px 32px rgba(31, 38, 135, 0.15);
    `;

const DashboardTitle = styled.h2`
        font-size: 2.25rem;
        font-weight: 800;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `;


const Dashboard = () => {
    const [themeKey, setThemeKey] = useState(
        localStorage.getItem("theme") || THEME_LIST.LIGHT
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.body.setAttribute("data-theme", themeKey);
        localStorage.setItem("theme", themeKey);
    }, [themeKey]);


    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const stats = [
        { title: "Total Patients", value: "10" },
        { title: "Doctors Available", value: "3" },
        { title: "Appointments Today", value: "6" },
        { title: "Pending Reports", value: "4" }
    ];

    const actions = [
        { title: "Add Patient", onClick: () => console.log("Add Patient") },
        { title: "Book Appointment", onClick: () => console.log("Book Appointment") },
        { title: "View Reports", onClick: () => console.log("View Reports") }
    ];

    return (
        <ThemeProvider theme={themes[themeKey]}>
            <div className="dashboard">

                <DashboardHeader className="dashboard-header">
                    {loading ? (
                        <div className="skeleton-header"></div>
                    ) : (
                        <>
                            <DashboardTitle>Dashboard</DashboardTitle>

                            <select
                                className="theme-dropdown"
                                value={themeKey}
                                onChange={(e) => { setThemeKey(e.target.value); }}
                            >
                                {Object.values(THEME_LIST).map((key) => (
                                    <option key={key} value={key}>
                                        {key.charAt(0).toUpperCase() + key.slice(1)} Theme
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                </DashboardHeader>

                <main className="dashboard-content">
                    {loading ? (
                        <>
                            <div className="dashboard-section skeleton-section"></div>
                            <div className="stats-grid">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="stat-card skeleton-card"></div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="overview-sticky-wrapper">
                                <div className="dashboard-section overview">
                                    <h1>Welcome Back!</h1>
                                    <p>Hospital status overview</p>
                                </div>

                                <div className="stats-grid">
                                    {stats.map((stat, index) => (
                                        <StatCard key={index}>
                                            <h3>{stat.title}</h3>
                                            <p>{stat.value}</p>
                                        </StatCard>
                                    ))}
                                </div>
                            </div>

                            <div className="dashboard-section">
                                <h2>Hospital Services</h2>
                                <div className="image-card-grid">
                                    <div className="image-card">
                                        <img
                                            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"
                                            alt="Patients"
                                        />
                                        <div className="image-card-content">
                                            <h4>Patient Management</h4>
                                            <p>Register and manage patient records.</p>
                                        </div>
                                    </div>

                                    <div className="image-card">
                                        <img
                                            src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80"
                                            alt="Doctors"
                                        />
                                        <div className="image-card-content">
                                            <h4>Doctor Scheduling</h4>
                                            <p>Track doctor availability.</p>
                                        </div>
                                    </div>

                                    <div className="image-card">
                                        <img
                                            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                                            alt="Reports"
                                        />
                                        <div className="image-card-content">
                                            <h4>Lab Reports</h4>
                                            <p>Manage diagnostic reports.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="dashboard-section">
                                <h3>Quick Actions</h3>
                                <div className="quick-actions">
                                    {actions.map((action, index) => (
                                        <Button
                                            key={index}
                                            title={action.title}
                                            onClick={action.onClick}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </ThemeProvider>
    );
};

export default Dashboard;
