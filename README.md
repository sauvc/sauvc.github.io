# sauvc.github.io

Singapore AUV Challenge website, built with [Astro](https://astro.build) and served from GitHub Pages at https://sauvc.org.

## Editing the content

All content lives in [`src/content/`](src/content). Lists of things (teams, sponsors, schedule) are YAML files, and prose is Markdown. You can edit them directly on GitHub.

| File | What it holds |
| --- | --- |
| `edition.yml` | Year, dates, city, hero stats, the call to action, and which sections the home page shows |
| `site.yml` | Site title and description used in search results and social media previews |
| `info/*.md` | The four cards at the top of the page |
| `competition.md` | The competition text, including the rulebook link |
| `teams/*.yml` | Registered, short-listed, finalist and winning teams |
| `schedule.yml` | Day-by-day schedule |
| `speakers.yml` | Guest speakers |
| `travel.yml`, `travel/*.md` | Travel photo and one card per topic (`order` sets the position) |
| `venue.yml`, `venue.md` | Venue photos, optional map, and address |
| `sponsors.yml`, `sponsors.md` | Sponsor logos and the text above them |
| `supporters.yml`, `supporters.md` | Organiser logos and text in the footer |
| `organizers.yml` | The "About us" committee |
| `media.yml` | Photo albums and video playlists from the competition |
| `social.yml`, `contacts.yml` | Social media and contact links |
| `past-events.yml` | Years with an archived site |

To show or hide a section, add or comment out its line under `sections:` in `edition.yml`. The navbar follows the same list.

The team lists in `teams/` refer to teams in `registered.yml` by id (for example `AU-05`). A team table appears once it has entries; add `hidden: true` to keep it off the page while you enter results. The flag next to each team comes from the first two letters of its id; set `flag:` on the team to override it.

Images go in [`public/img/`](public/img) and are referred to by their path from there, e.g. `img/sponsors/oes.png`. Preferred sizes:

- [AUV images](public/img/auv) `200 x 200` pixels, `JPG`
- [Competitors' images](public/img/competitors) `640` pixels wide, `JPG`
- Landscape photos `1200` pixels wide, `JPG`
- [Social icons](public/img/social) `120 x 120`, `PNG`
- [Sponsor logos](public/img/sponsors) `300` pixels wide
- [Organiser photos](public/img/team) `200 x 200` pixels, `JPG`

## Publishing

Every push to `master` builds and deploys the site through GitHub Actions; it is live a minute or two later. The build checks every content file, so a mistyped key or an unknown team id stops it with an error naming the file. If a commit shows a red ❌, open it to read the error: the edit is not live until it is fixed.

## Starting a new year

Each year's site is archived as a fork of this repository, served from `sauvc.org/<year>/`. Before clearing the content for the next year:

1. Fork this repository to `sauvc/<year>`, e.g. `sauvc/2027`.
2. In the fork, set `base: '/2027'` in `astro.config.mjs`.
3. In the fork's settings, enable Actions and set Pages → Source to "GitHub Actions".
4. In the fork, run the Deploy workflow once by hand (Actions → Deploy → Run workflow).
5. Here, add the year to `past-events.yml`, then update the content for the new year.

## Development

Requires Node 24 or later and [pnpm](https://pnpm.io).

```sh
pnpm install
pnpm dev      # local server at http://localhost:4321
pnpm build    # build into dist/
pnpm check    # type-check the code and content
```

Code layout:

- `src/pages/index.astro` is the only page; it renders the sections listed in `edition.yml`.
- `src/components/sections/` has one component per section, and `src/lib/sections.ts` lists the section names with their navbar labels.
- `src/content.config.ts` defines the schema of every content file.
- `src/styles/global.css` holds the shared styles; component-specific styles live in each component.
- `tools/` has one-off scripts for preparing team data, with their own `package.json`.
