module.exports = {
  title: "VeVue",
  description: "vue ui组件库，自定义，可拆分的组件库",
  port: 8089,
  base: "./",
  themeConfig: {
    nav: [
      { text: "github", link: "https://github.com/zlongCoding/ve-vue/" },
      // { text: '文档', link: '  /' },
      // { text: '交流', link: '/' }
    ],
    sidebar: [
      "/",
      {
        title: "入门",
        children: ["/install/", "/get-start/"],
      },
      {
        title: "组件",
        children: [
          "/components/tooltip.md",
          "/components/spread.md",
          "/components/switch.md",
          "/components/checkbox.md",
          "/components/radio.md",
          "/components/pagination.md",
          "/components/button.md",
          "/components/slider.md",
        ],
      },
    ],
  },
};
