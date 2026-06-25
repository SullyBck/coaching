'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {isSingletonType} from './src/sanity/singletons'
import {structure} from './src/sanity/structure'
import {availabilityCalendarTool} from './src/sanity/tools/availabilityCalendar'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  schema,
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  tools: (prev) => [...prev, availabilityCalendarTool],
  document: {
    // Pages like "Accueil" or "Contact" only ever need a single document:
    // hide create/duplicate/delete so an editor can't end up with two.
    actions: (input, context) =>
      isSingletonType(context.schemaType)
        ? input.filter(
            ({action}) => action && !['duplicate', 'delete', 'unpublish'].includes(action),
          )
        : input,
    newDocumentOptions: (options) =>
      options.filter((option) => !isSingletonType(option.templateId)),
  },
})
