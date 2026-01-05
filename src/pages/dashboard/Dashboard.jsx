import { useState, useEffect } from "react";
import "../../styles/pages/Dashboard.css";

const Dashboard = () => {
    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                {loading ? (
                    <div className="skeleton-header"></div>
                ) : (
                    <>
                        <h2 className="dashboard-title">Dashboard</h2>
                        <button className="theme-toggle" onClick={toggleTheme}>
                            {theme === "light" ? "🌙 Dark" : "☀️ Light"}
                        </button>
                    </>
                )}
            </header>

            <main className="dashboard-content">
                {loading ? (
                    <>
                        <div className="dashboard-section skeleton-section"></div>

                        <div className="stats-grid">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="stat-card skeleton-card"></div>
                            ))}
                        </div>

                        <div className="image-card-grid">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="image-card skeleton-image-card"></div>
                            ))}
                        </div>

                        <div className="dashboard-section skeleton-chart"></div>

                        <div className="dashboard-section skeleton-actions"></div>
                    </>
                ) : (
                    <>
                        <div className="overview-sticky-wrapper">
                            <div className="dashboard-section overview">
                                <h3>Overview</h3>
                                <p>Welcome to the Hospital Management System.</p>
                            </div>

                            <div className="stats-grid">
                                <div className="stat-card">
                                    <h3>Total Patients</h3>
                                    <p>10</p>
                                </div>
                                <div className="stat-card">
                                    <h3>Doctors Available</h3>
                                    <p>3</p>
                                </div>
                                <div className="stat-card">
                                    <h3>Appointments Today</h3>
                                    <p>8</p>
                                </div>
                                <div className="stat-card">
                                    <h3>Pending Reports</h3>
                                    <p>2</p>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3>Hospital Services</h3>

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
                                        <p>Track doctor availability and shifts.</p>
                                    </div>
                                </div>

                                <div className="image-card">
                                    <img
                                        src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
                                        alt="Reports"
                                    />
                                    <div className="image-card-content">
                                        <h4>Lab Reports</h4>
                                        <p>View and manage diagnostic reports.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3>Appointments This Week</h3>
                            <div className="chart">
                                <div className="chart-bars">
                                    <div className="bar primary" style={{ height: "60%" }}><span>Monday</span></div>
                                    <div className="bar secondary" style={{ height: "80%" }}><span>Tuesday</span></div>
                                    <div className="bar primary" style={{ height: "45%" }}><span>Wednesday</span></div>
                                    <div className="bar secondary" style={{ height: "90%" }}><span>Thursday</span></div>
                                    <div className="bar primary" style={{ height: "70%" }}><span>Friday</span></div>
                                    <div className="bar secondary" style={{ height: "55%" }}><span>Saturday</span></div>
                                    <div className="bar primary" style={{ height: "85%" }}><span>Sunday</span></div>
                                </div>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3>Quick Actions</h3>
                            <div className="quick-actions">
                                <button className="action-btn">+ Add Patient</button>
                                <button className="action-btn">📅 Book Appointment</button>
                                <button className="action-btn">📋 View Reports</button>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
};

export default Dashboard;
