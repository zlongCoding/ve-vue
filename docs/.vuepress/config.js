module.exports = {
  title: "VeVue",
  description: "vue ui组件库，自定义，可拆分的组件库",
  port: 8089,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  base: process.env.NODE_ENV === "development" ? "/" : "/ve-vue/",
  themeConfig: {
    nav: [
      // { text: '首页', link: '/' },
      // { text: '文档', link: '  /' },
      // { text: '交流', link: '/' }
    ],
    sidebar: [
      "/introduce/",
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
