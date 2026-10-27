import { getCollection, getEntry, render, type CollectionEntry, type CollectionKey } from 'astro:content';

/** Data of a collection backed by a single file, e.g. `one('edition')`. */
export async function one<C extends CollectionKey>(collection: C): Promise<CollectionEntry<C>['data']> {
  const [entry] = await getCollection(collection);
  return entry.data;
}

/** Cards from a Markdown folder, sorted by `order`, each with its frontmatter and rendered `Content`. */
export async function cards<C extends 'info' | 'travelCards'>(
  collection: C,
): Promise<(CollectionEntry<C>['data'] & Awaited<ReturnType<typeof render>>)[]> {
  const entries: CollectionEntry<C>[] = await getCollection(collection);
  entries.sort((a, b) => a.data.order - b.data.order);
  return Promise.all(entries.map(async (entry) => ({ ...entry.data, ...(await render(entry)) })));
}

/** The rendered content of a Markdown file at the top of src/content, e.g. `text('venue')`. */
export async function text(name: string) {
  const entry = await getEntry('text', name);
  if (!entry) throw new Error(`Missing src/content/${name}.md`);
  return (await render(entry)).Content;
}

/**
 * Resolves a path from the content (`img/logo.png`, `/#teams`) against the
 * site's base path, so archive forks served from /<year>/ keep working.
 * External URLs are returned unchanged.
 */
export function url(path: string) {
  if (/^([a-z]+:|\/\/)/i.test(path)) return path;
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/** Flag emoji from the country code that starts a team id: `AU-05` → 🇦🇺 */
export function flag(id: string) {
  const letters = [...id.slice(0, 2).toUpperCase()];
  return String.fromCodePoint(...letters.map((c) => c.codePointAt(0)! + 0x1f1a5));
}

/**
 * The team lists with each id resolved to its team in registered.yml.
 * An unknown id fails the build, whether or not its table is shown.
 */
export async function teams() {
  const registered = await one('registered');
  const byId = new Map(registered.teams.map((team) => [team.id, team]));
  const team = (id: string, file: string) => {
    const found = byId.get(id);
    if (!found) throw new Error(`Team ${id} in teams/${file}.yml is not in teams/registered.yml`);
    return found;
  };

  const winners = await one('winners');
  const innovationAward = await one('innovationAward');
  const qualified = await one('qualified');
  const shortlisted = await one('shortlisted');
  return {
    registered,
    winners: { ...winners, teams: winners.teams.map((w) => ({ ...w, team: team(w.id, 'winners') })) },
    innovationAward: { ...innovationAward, teams: innovationAward.teams.map((id) => team(id, 'innovation-award')) },
    qualified: { ...qualified, slots: qualified.slots.map((s) => ({ ...s, team: team(s.id, 'qualified') })) },
    shortlisted: { ...shortlisted, teams: shortlisted.teams.map((id) => team(id, 'shortlisted')) },
  };
}
