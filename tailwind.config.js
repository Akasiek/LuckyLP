/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx}"],
    theme: {
        fontFamily: {
            serif: ["Lora", "serif"],
            sans: ["Josefin Sans", "sans-serif"],
        },
        extend: {
            colors: {
                "main-spotify": "#1db954",
            },
        },
    },
    plugins: [],
};
