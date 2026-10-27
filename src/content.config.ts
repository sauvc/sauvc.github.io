import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { sectionNames } from './lib/sections';

/** A collection of the files matching `pattern` in src/content. */
const files = <S extends z.ZodType>(pattern: string, schema?: S) =>
  defineCollection({ loader: glob({ pattern, base: './src/content' }), schema });

/** A YAML list that may be empty, e.g. when every entry is commented out. */
const list = <T extends z.ZodType>(item: T) =>
  z.array(item).nullish().transform((items) => items ?? []);

/** Objects reject unknown keys, so a typo in a key fails the build. */
const record = z.strictObject;

/** Path of a file in public/, e.g. img/team/venu.jpg */
const path = z.string();

const link = record({ name: z.string(), url: z.string(), image_path: path });

/** Shared by the team tables: whether the table starts expanded or is hidden. */
const table = { open: z.boolean().default(false), hidden: z.boolean().default(false) };

export const collections = {
  site: files(
    'site.yml',
    record({
      title: z.string(),
      longname: z.string(),
      description: z.string(),
      image: path,
      twitter: z.string(),
    }),
  ),
  edition: files(
    'edition.yml',
    record({
      year: z.number(),
      dates: z.string(),
      city: z.string(),
      stats: list(record({ number: z.number(), type: z.string(), caption: z.string() })),
      action: z.string(),
      action_link: z.string().optional(),
      action_info: z.string().optional(),
      sections: list(z.enum(sectionNames)),
    }),
  ),
  pastEvents: files('past-events.yml', record({ years: list(z.number()) })),

  // Prose, rendered from Markdown.
  text: files('*.md'),
  info: files('info/*.md', record({ order: z.number(), title: z.string() })),
  travelCards: files(
    'travel/*.md',
    record({ order: z.number(), title: z.string(), link: z.string().optional() }),
  ),

  social: files('social.yml', record({ list: list(link) })),
  contacts: files(
    'contacts.yml',
    record({ list: list(link.extend({ action: z.string() })) }),
  ),
  sponsors: files(
    'sponsors.yml',
    record({ list: list(link.extend({ url: z.string().nullish() })) }),
  ),
  supporters: files('supporters.yml', record({ list: list(link) })),
  organizers: files(
    'organizers.yml',
    record({ list: list(record({ name: z.string(), role: z.string(), image_path: path })) }),
  ),
  speakers: files(
    'speakers.yml',
    record({
      list: list(
        record({
          name: z.string(),
          title: z.string(),
          profile_image: path,
          talk_title: z.string(),
          talk_description: z.string(),
          bio: z.string(),
        }),
      ),
    }),
  ),
  schedule: files(
    'schedule.yml',
    record({
      days: list(
        record({
          sequence: z.number(),
          date: z.string(),
          day_of_week: z.string(),
          slots: list(
            record({
              time: z.string(),
              description: z.string(),
              venue: z.string().nullish(),
              venue_link: z.string().optional(),
              note: z.string().optional(),
            }),
          ),
        }),
      ),
    }),
  ),
  media: files(
    'media.yml',
    record({
      photos: record({ name: z.string(), icon: path, days: list(z.string()) }),
      videos: list(record({ title: z.string(), playlist: z.url() })),
    }),
  ),
  travel: files('travel.yml', record({ city: z.string(), image: path })),
  venue: files(
    'venue.yml',
    record({
      images: list(record({ path, name: z.string() })),
      map: z.string().optional(),
    }),
  ),

  // Teams. Every list refers to teams in registered.yml by id.
  registered: files(
    'teams/registered.yml',
    record({
      ...table,
      teams: list(
        record({
          id: z.string(),
          name: z.string(),
          url: z.string().nullish(),
          institute: z.string(),
          'institute-url': z.string().nullish(),
          location: z.string(),
          flag: z.string().optional(),
        }),
      ),
    }),
  ),
  shortlisted: files('teams/shortlisted.yml', record({ ...table, teams: list(z.string()) })),
  innovationAward: files(
    'teams/innovation-award.yml',
    record({ ...table, teams: list(z.string()) }),
  ),
  qualified: files(
    'teams/qualified.yml',
    record({
      ...table,
      title: z.string(),
      slots: list(
        record({
          id: z.string(),
          rank: z.number().optional(),
          finals_rank: z.number().optional(),
          prize: z.string().optional(),
        }),
      ),
    }),
  ),
  winners: files(
    'teams/winners.yml',
    record({
      hidden: table.hidden,
      teams: list(record({ id: z.string(), position: z.string(), image_path: path })),
    }),
  ),
};
