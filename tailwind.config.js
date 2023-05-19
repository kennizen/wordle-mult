/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            keyframes: {
                scaleInOut: {
                    "0%": { transform: "scale(1, 1)" },
                    "50%": { transform: "scale(1.2, 1.2)" },
                    "100%": { transform: "scale(1, 1)" },
                },
            },
            animation: {
                "scale-in-out": "scaleInOut 0.3s ease-in-out",
            },
        },
    },
    plugins: [],
};
