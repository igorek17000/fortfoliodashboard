module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{vue,js}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  media: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand:{
          grey: "#EFF0F6",
          blue: "#03426d",
          light: {
            blue: "#00ADEE"
          },
          clear_white: "#ffffff23"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};