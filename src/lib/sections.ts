/**
 * Home page sections that `edition.yml` can list, with their navbar entry.
 * Sections without a navbar entry are `null`.
 */
export const sections = {
  photos: null,
  info: { label: 'Information', anchor: 'information' },
  teams: { label: 'Teams', anchor: 'teams' },
  videos: null,
  competition: { label: 'Competition', anchor: 'competition' },
  schedule: { label: 'Schedule', anchor: 'schedule' },
  speakers: { label: 'Speakers', anchor: 'speakers' },
  travel: { label: 'Travel', anchor: 'travel' },
  venue: { label: 'Venue', anchor: 'venue' },
  sponsors: { label: 'Sponsors', anchor: 'sponsors' },
  contact: { label: 'Contact', anchor: 'contact' },
  about: null,
} as const;

export type Section = keyof typeof sections;

export const sectionNames = Object.keys(sections) as [Section, ...Section[]];
