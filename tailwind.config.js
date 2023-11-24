/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary_200: "#C7EFF1",
        primary_500: "#23B4C8",
        primary_900: "#125C66",
        primary_content_bg_100: "#EAF2F6",
        primary_content_bg_400: "#A1CCDB",
        subcolor_2_500: "#FFE65F",
        content_bg_0: "#FFFFFF",
        content_bg_100: "#F7F7F7",
        content_bg_200: "#DBDBDB",
        text_color_100: "#AEB6BF",
        text_color_300: "#657280",
        text_color_500: "#343A40",
        text_color_800: "#111111",
        success_color_300: "#AEECB0",
        success_color_800: "#008003",
        warn_color_300: "#FFDDDD",
        warn_color_500: "#F56060",
        warn_color_800: "#9B3131",
        rightMenu: "rgba(82, 89, 96, 0.6)",
      },
    },
  },
  plugins: [],
};
