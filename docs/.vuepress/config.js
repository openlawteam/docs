module.exports = {
  title: "OpenLaw Docs", // 🎉
  description: "OpenLaw Documentation",
  themeConfig: {
    // nav: [
    //   { text: 'OpenLaw.io', link: 'https://openlaw.io' },
    // ],
    sidebar: [
      {
        title: "Guide",
        collapsable: false,
        children: ["/", "/getting-started/", "/openlaw-core/"]
      },
      {
        title: "Reference",
        collapsable: false,
        children: ["/api-client/", "/openlaw-object/"]
      },
      {
        title: "Using OpenLaw",
        collapsable: false,
        children: ["/markup-language/"]
      },
      {
        title: "Review Tool",
        collapsable: false,
        children: ["/review-tool/"]
      }
      // add new top level sections here...
    ],
    algolia: {
      apiKey: "68c3c0d36676a3acce1cd3c7087bc7c9",
      indexName: "openlaw"
    },
    logo: "/ol-logo-color.svg",
    repo: "openlawteam/docs",
    docsDir: "docs",
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: "Help us improve this page",
    // Enables a popup to refresh site content. The popup will be shown when the site is updated. It provides a refresh button to allow users to refresh contents immediately.
    serviceWorker: {
      updatePopup: true
    }
  }
};
