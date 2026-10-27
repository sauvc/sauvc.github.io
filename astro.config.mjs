// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sauvc.org',
  // Archive forks are served from /<year>/: set base to '/<year>' in the fork.
  base: '/',
  // Keep line breaks between inline elements, which render as spaces.
  compressHTML: false,
  vite: {
    // Flatten CSS nesting for older browsers, e.g. the WeChat in-app browser.
    build: { cssTarget: ['chrome87', 'safari14'] },
  },
});
