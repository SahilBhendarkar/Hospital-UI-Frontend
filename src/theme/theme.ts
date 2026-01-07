export enum THEME_LIST {
    LIGHT = "light",
    DARK = "dark",
    BLUE = "blue",
    GREEN = "green",
    PURPLE = "purple"
}
export const themes = {
    [THEME_LIST.LIGHT]: {
        bgMain: "#f8fafc",
        bgCard: "#ffffff",
        primary: "#000000ff",
        border: "#e2e8f0",
        shadow: "rgba(0,0,0,0.08)",
        radius: "20px"
    },
    [THEME_LIST.DARK]: {
        bgMain: "#0f172a",
        bgCard: "#1e293b",
        primary: "#e0e2e5ff",
        border: "#334155",
        shadow: "rgba(0,0,0,0.3)",
        radius: "20px"
    },
    [THEME_LIST.BLUE]: {
        bgMain: "#b8ccf2ff",
        bgCard: "#ffffff",
        primary: "#1d4ed8",
        border: "#183ac4ff",
        shadow: "rgba(29,78,216,0.2)",
        radius: "20px"
    },

    [THEME_LIST.GREEN]: {
        bgMain: "#ecfdf5",
        bgCard: "#ffffff",
        primary: "#10b981",
        border: "#a7f3d0",
        shadow: "rgba(16,185,129,0.25)",
        radius: "20px"
    },

    [THEME_LIST.PURPLE]: {
        bgMain: "#faf5ff",
        bgCard: "#ffffff",
        primary: "#7c3aed",
        border: "#ddd6fe",
        shadow: "rgba(124,58,237,0.25)",
        radius: "20px"
    }
};

