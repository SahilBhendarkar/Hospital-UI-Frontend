import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Root = () => {

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                    <App />
            </AuthProvider>
        </QueryClientProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);
