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
    // Gets the UNIX timestamp(ms) of each file's last git commit, and it will also display at the bottom of each page in an appropriate format. The string will be displayed as a prefix.
    lastUpdated: "Last updated"
  },
  /* locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/': {
      lang: 'en-US', // this will be set as the lang attribute on <html>
      title: 'OpenLaw Documentation',
      description: 'English version of OpenLaw Documentation'
    },
    '/es/': {
      lang: 'es-ES',
      title: 'Documentación OpenLaw',
      description: 'Versión en español de la documentación de OpenLaw'
    }
  } */
};



