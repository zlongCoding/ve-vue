module.exports = {
  title: "Hello VuePress",
  description: "Just playing around",
  port: 8089,
  base: process.env.NODE_ENV === "development" ? "/" : "/ve-vue/",
  themeConfig: {
    nav: [
      // { text: '首页', link: '/' },
      // { text: '文档', link: '/' },
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
          // "/components/button.md",
          // "/components/buttonGroup.md",
          // "/components/icon.md",
          // "/components/input.md",
          // "/components/layout.md",
          // "/components/container.md",
          // "/components/collapse.md",
          // "/components/tabs.md",
          "/components/tooltip.md",
          // "/components/toast.md",
          "/components/spread.md",
          "/components/switch.md",
        ],
      },
    ],
  },
};
