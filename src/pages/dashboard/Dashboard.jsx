import { useState, useEffect } from "react";
import styled from "styled-components";
import "../../styles/pages/Dashboard.css"; 

const themes = {
    light: {
        bgMain: "#f8fafc",
        bgCard: "#ffffff",
        primary: "#ffffffff",
        border: "#e2e8f0",
        shadow: "rgba(0,0,0,0.08)",
        radius: "20px"
    },
    dark: {
        bgMain: "#0f172a",
        bgCard: "#1e293b",
        primary: "#8b5cf6",
        border: "#334155",
        shadow: "rgba(0,0,0,0.3)",
        radius: "20px"
    }
};


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
        box-shadow: ${({ theme }) => theme.shadow};
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
        background: #8b5cf6;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const DashboardHeader = styled.header` 
    height: 80px;
    background:${({ theme }) => theme.primary}
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
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) setTheme(savedTheme);
    }, []);

    useEffect(() => {
        document.body.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const stats = [
        { title: "Total Patients", value: "10" },
        { title: "Doctors Available", value: "3" },
        { title: "Appointments Today", value: "6" },
        { title: "Pending Reports", value: "4" }
    ];

    return (
        <div className="dashboard">
            <DashboardHeader className="dashboard-header">
                {loading ? (
                    <div className="skeleton-header"></div>
                ) : (
                    <>
                        <DashboardTitle className="dashboard-title">Dashboard</DashboardTitle>
                        <button className="theme-toggle" onClick={toggleTheme}>
                            {theme === "light" ? "🌙" : "☀️"}
                        </button>
                    </>
                )}
            </DashboardHeader>

            <main className="dashboard-content">
                {loading ? (
                    <>
                        <div className="dashboard-section skeleton-section"></div>
                        <div className="stats-grid">
                            {[1,2,3,4].map(item => (
                                <div key={item} className="stat-card skeleton-card"></div>
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
                                    <StatCard
                                        key={index}
                                        theme={theme === "light" ? themes.light : themes.dark}
                                    >
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
                                    <img src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80" alt="Patients" />
                                    <div className="image-card-content">
                                        <h4>Patient Management</h4>
                                        <p>Register and manage patient records.</p>
                                    </div>
                                </div>
                                <div className="image-card">
                                    <img src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80" alt="Doctors" />
                                    <div className="image-card-content">
                                        <h4>Doctor Scheduling</h4>
                                        <p>Track doctor availability.</p>
                                    </div>
                                </div>
                                <div className="image-card">
                                    <img src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80" alt="Reports" />
                                    <div className="image-card-content">
                                        <h4>Lab Reports</h4>
                                        <p>Manage diagnostic reports.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h2>Appointments This Week</h2>
                            <div className="chart">
                                <div className="chart-bars">
                                    <div className="bar primary" style={{height: "60%"}}><span>Mon</span></div>
                                    <div className="bar secondary" style={{height: "80%"}}><span>Tue</span></div>
                                    <div className="bar primary" style={{height: "45%"}}><span>Wed</span></div>
                                    <div className="bar secondary" style={{height: "90%"}}><span>Thu</span></div>
                                    <div className="bar primary" style={{height: "70%"}}><span>Fri</span></div>
                                    <div className="bar secondary" style={{height: "55%"}}><span>Sat</span></div>
                                    <div className="bar primary" style={{height: "85%"}}><span>Sun</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3>Quick Actions</h3>
                            <div className="quick-actions">
                                <button className="action-btn">Add Patient</button>
                                <button className="action-btn">Book Appointment</button>
                                <button className="action-btn">View Reports</button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;