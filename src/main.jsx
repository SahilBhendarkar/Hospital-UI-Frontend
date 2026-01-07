import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./theme/theme";

const queryClient = new QueryClient();

const Root = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const toggleTheme = () => {
        setTheme((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem("theme", next);
            return next;
        });
    };

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
                    <App toggleTheme={toggleTheme} />
                </ThemeProvider>
            </AuthProvider>
        </QueryClientProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
