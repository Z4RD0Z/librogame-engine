// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'getting-started/quick-start',
        'getting-started/project-structure',
        'getting-started/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Story Authoring',
      collapsed: false,
      items: [
        'authoring/story-structure',
        'authoring/text-formatting',
        'authoring/requirements-and-items',
        'authoring/tests',
        'authoring/media',
      ],
    },
    {
      type: 'category',
      label: 'Gameplay',
      collapsed: false,
      items: [
        'gameplay/character-creation',
        'gameplay/stats-and-perks',
        'gameplay/inventory',
        'gameplay/dice',
      ],
    },
    {
      type: 'category',
      label: 'Customization',
      collapsed: false,
      items: [
        'customization/themes',
        'customization/languages',
        'customization/interface',
        'customization/credits',
      ],
    },
    {
      type: 'category',
      label: 'Tools',
      collapsed: false,
      items: [
        'tools/story-converter',
        'tools/markdown-syntax',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/technical-details',
        'reference/security',
      ],
    },
    'contributing',
  ],
};

export default sidebars;
