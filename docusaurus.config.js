module.exports = {
  title: 'Quinn',
  tagline: 'Software Engineer',
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'Quinn', // Usually your GitHub org/user name.
  projectName: 'Blog', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Quinn',
      logo: {
        alt: 'Quinn Logo',
        // src: 'img/logo.svg',
        src: 'img/logo.jpeg'
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: '文档',
          position: 'left',
        },
        {to: 'blog', label: '博客', position: 'left'},
        {to: 'blog/tags', label: '所有标签', position: 'left'},
        {
          href: 'https://github.com/StandOutstar',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © 1993-${new Date().getFullYear()} Quinn <br/> Built with Docusaurus2.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/StandOutstar/it-blog/tree/master/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/StandOutstar/it-blog/tree/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
