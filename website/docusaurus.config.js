// @ts-check

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Librogame Engine',
  tagline: 'Build interactive gamebooks with vanilla HTML, CSS, and JavaScript',

  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://z4rd0z.github.io',
  baseUrl: '/librogame-engine/',

  organizationName: 'Z4RD0Z',
  projectName: 'librogame-engine',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/Z4RD0Z/librogame-engine/tree/master/website/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/logo.jpeg',
      colorMode: {
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'Librogame Engine',
        logo: {
          alt: 'Librogame Engine logo',
          src: 'img/logo.jpeg',
        },
        hideOnScroll: true,
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'tools/story-converter',
            position: 'left',
            label: 'Story Converter',
          },
          {
            href: 'https://github.com/Z4RD0Z/librogame-engine',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/',
              },
              {
                label: 'Quick Start',
                to: '/getting-started/quick-start',
              },
              {
                label: 'Story Converter',
                to: '/tools/story-converter',
              },
            ],
          },
          {
            title: 'Project',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Z4RD0Z/librogame-engine',
              },
              {
                label: 'Issues',
                href: 'https://github.com/Z4RD0Z/librogame-engine/issues',
              },
              {
                label: 'Releases',
                href: 'https://github.com/Z4RD0Z/librogame-engine/releases',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Contributing',
                to: '/contributing',
              },
              {
                label: 'License',
                href: 'https://github.com/Z4RD0Z/librogame-engine/blob/master/LICENSE',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Andrea Lomazzo. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
    }),
};

export default config;
