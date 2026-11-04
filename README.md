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

## Shared header, navigation and footer:

The `<head>` tags, site header/navigation and footer are in `partials/` and shared by every page. Edit them there once instead of in each page. Each page includes them like this:

```
{{> head title="About | ATEC" description="..."}}
{{> header current="about"}}
{{> footer}}
```

`current` marks which nav link is the current page. To add a new page, copy an existing one, change those values, add a link in `partials/header.hbs`, and add the page name to the `pages` list in `vite.config.js`.

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
