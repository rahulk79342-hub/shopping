import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schema';

export default defineConfig({
  name: 'default',
  title: 'Snipes Admin Studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mockProject',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  basePath: '/admin/studio',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
});
