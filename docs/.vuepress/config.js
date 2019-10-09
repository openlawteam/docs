module.exports = {
  title: "OpenLaw Docs", // 🎉
  description: "OpenLaw Documentation",
  themeConfig: {
    // nav: [
    //   { text: 'OpenLaw.io', link: 'https://openlaw.io' },
    // ],
    sidebar: [
      {
        title: "Overview of OpenLaw",
        collapsable: false,
        children: ["/", "/private-self-hosted-instances/"]
      },
      {
        title: "Develop with OpenLaw",
        collapsable: false,
        children: ["/getting-started-overview/", "/openlaw-core/", "/openlaw-object/", "/api-client/", "/openlaw-elements/"]
      },
      {
        title: "First Draft",
        collapsable: false,
        children: ["/beginners-guide/", "/markup-language/"]
      },
      {
        title: "Sign & Store",
        collapsable: false,
        children: ["/sign-store/"]
      },
      {
        title: "Forms & Flows",
        collapsable: false,
        children: ["/forms-flows/"]
      },
      {
        title: "Token Forge",
        collapsable: false,
        children: ["/token-forge/"]
      },
      {
        title: "Integrate with OpenLaw",
        collapsable: false,
        children: ["/integration-framework/"]
      },
      {
        title: "Relayer",
        collapsable: false,
        children: ["/relayer/"]
      },
      {
        title: "Agreements Library",
        collapsable: false,
        children: ["/conversion-tool/", "/review-tool/"]
      },
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
