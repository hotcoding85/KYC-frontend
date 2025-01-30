/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1600px",
        "4xl": "1800px",
      },
      fontFamily: {
        inter: "Inter, sans-serif",
      },
      width: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
      },
      height: {
        128: "32rem",
        144: "36rem",
        160: "40rem",
        176: "44rem",
        192: "48rem",
      },
      colors: {
        pinkish: "#fdedec",
        textBlack: "#14151A",
        cardtext: "#858c95",
        customgray: "#272727",
        customDarkGray: "#22282B",
        primary: "#212121",
        primary50: "#E9E9E9",
        cardDes: "#5F5F6F",
        customYellow: "#FFC048",
        primary300: "#6A6A6A",
        green50: "#E9F8F0",
        green500: "#26BD6C",
        grey: "#EAEBED",
        grey50: "#F8F8F9",
        peach: "#F9C18D",
        grey100: "#E6E6E6",
        primary100: "#BABABA",
        textSecondary: "#4D4D4D",
        darkGrey: "#696969",
        alert500: "#E6483D",
        textLight: "#858C95",
        tableHover: "#FFEAEA",
        creamy: "#F9F8F4",
        lightlygray: "#E4E4E8",
        customGrayBlue: "#838993",
        customOffWhite: "#f9f8f4",
        lightGray: "#e9e9e9",
        graylight: "#f8f8f9",
        White: "#FFFF",
        warning50: "#FDEDEC",
        warning100: "#FCE2CA",
        blue500: "#4778F5",
        warningText: "#E0944D",
        tabBg: "#EDF2FE",
        charcoal: "#353535",
        off_white: "#F9f8f4",
        dark_blue: "#0141FF",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      placeholder: {
        sm: "text-sm",
      },
      keyframes: {
        loader: {
          "0%": { opacity: "0.9", transform: "scale(0.5)" },
          "100%": { opacity: "0.1", transform: "scale(1)" },
        },
      },
      animation: {
        loader: "loader 0.8s infinite alternate",
      },
      spacing: {
        dotSize: "20px", // Define custom dot size
      },
      boxShadow: {
        checkbox: "0px 0.8px 1.6px 0px rgba(20, 21, 26, 0.05)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari, and Edge */
        ".scrollbar-hide": {
          "-ms-overflow-style": "none" /* IE and Edge */,
          "scrollbar-width": "none" /* Firefox */,
        },
        ".scrollbar-hide::-webkit-scrollbar": {
          display: "none" /* Chrome, Safari, and Edge */,
        },
      });
    },
  ],
};
