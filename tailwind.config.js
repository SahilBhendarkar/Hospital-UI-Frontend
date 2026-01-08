/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#2563eb",
                    dark: "#1e40af",
                    light: "#dbeafe",
                },
                neutral: {
                    50: "#f8fafc",
                    100: "#f1f5f9",
                    200: "#e2e8f0",
                    600: "#475569",
                    800: "#1e293b",
                    900: "#0f172a",
                },
                success: "#16a34a",
                warning: "#d97706",
                danger: "#dc2626",
            },
            fontFamily: {
                sans: [
                    "Inter",
                    "system-ui",
                    "-apple-system",
                    "Segoe UI",
                    "Roboto",
                    "sans-serif",
                ],
            },
        },
    },
    plugins: [],
};
