module.exports = {
  title: "OpenLaw Docs", // 🎉
  description: "OpenLaw Documentation",
  themeConfig: {
    // nav: [
    //   { text: 'OpenLaw.io', link: 'https://openlaw.io' },
    // ],
    sidebar: [
      "/",
      "/markup-language/"
      // add new top level sections here...
    ],
    logo: "/ol-logo-black.svg",
    repo: "openlawteam/docs",
    docsDir: "docs",
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page"
  },
  markdown: {
    lineNumbers: true
  }
};
