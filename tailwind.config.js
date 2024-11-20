export default {
  content: ["./src/**/*.tsx", "./src/**/*.css"],
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      colors: {
        main: '#1C9C80',
        text: {
          normal: '#1C2533',
          light: '#7C8DA8',
          lighter: '#B9C2CF',
        },
        gradientfrom: '#1C939C',
        gradientto: '#1C9C80',
      }
    }
  }
};
