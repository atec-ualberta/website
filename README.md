# ATEC website

## To run and modify locally:

- Open a terminal with git and npm installed.
- Run the following commands:
```
git clone https://github.com/atec-ualberta/website/
cd website
npm install
npm run dev
```

- Open http://localhost:8080 in your browser. Pages reload automatically as you edit them.

## Project layout:

```
src/                 the website itself
  *.html             one file per page
  partials/          shared <head>, header/navigation and footer
  css/styles.css     all styles
  js/main.js         mobile menu, accordions and carousels
  data/team.json     team members shown on the Team page
  images/            logos, photos and icons
  images/headshots/  team member photos
vite.config.js       build settings and the list of pages
```

## Shared header, navigation and footer:

The `<head>` tags, site header/navigation and footer are in `src/partials/` and shared by every page. Edit them there once instead of in each page. Each page includes them like this:

```
{{> head title="About | ATEC" description="..."}}
{{> header current="about"}}
{{> footer}}
```

`current` marks which nav link is the current page. To add a new page, copy an existing one, change those values, add a link in `src/partials/header.hbs`, and add the page name to the `pages` list in `vite.config.js`.

## Updating the team page:

Team members are listed in `src/data/team.json`, grouped by section (`admin`, `technical`, `research`). Add, remove or reorder entries there; the cards on the Team page are generated from it.

```json
{ "name": "Brian Sanchez", "role": "Co-President", "program": "Mechanical-Biomedical Engineering" }
```

To add a headshot, put the photo in `src/images/headshots/`, named after the member's name in lowercase with underscores (`brian_sanchez.png`). `.png`, `.jpg`, `.jpeg` and `.webp` all work; square photos look best. Members without a matching photo get the placeholder automatically. Refresh the page after adding a photo.

## To preview the production build:

```
npm run build
npm run preview
```

## To deploy:

Pushing to `main` deploys automatically through GitHub Actions. To deploy manually, run:

```
npm run deploy
```

- Go to the Pages section of this repository's settings (https://github.com/atec-ualberta/website/settings/pages) and make sure the source is the `gh-pages` branch.
