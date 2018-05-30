# Gymlib blog

## Get started

`npm install` to install all dependencies

`npm i -g gatsby-cli` to install the Gatsby CLI to run Gatsby commands

`gatsby develop` or `npm run develop` runs Gatsby in the development environment

`gatsby build` or `npm run build` runs a production build of the site

`gatsby serve` or `npm run serve` will serve the production build

You can also run `npm run clean` to clear out old build caches/artefacts (sometimes required between development runs if the build fails to start)

## Directory structure

### `content` contains CMS-generated content

Inside it, we have:

`posts` directory containing all the blog posts in markdown.

`authors` directory containing JSON files for each author (needed to allow authors to have images).

`categories` directory containing JSON files for each category (needed to allow categories to have colour coding).

### `data` contains data for the site, including translations

`SiteConfig.json` is a global data set for the whole site with entries like titles, social media profiles etc. Some of the entries in this file are editable via Netlify CMS.
`translations` contains a JSON file for each supported language. These translations are editable via Netlify CMS.

### `static` contains files that Gatsby will copy over to the production build

We include a default `favicon` and `robots.txt` here.

The `img` directory is the upload point for the Netlify CMS image uploader. Most of the images here are processed by `gatsby-image` for use on the site.

The `admin` directory is used by Netlify CMS. The `config.yml` file inside it contains all of the config for the CMS - details of the "collections" and how they can be edited.

### `src` contains all the components and templates for the site

`cms` is where the blog post preview templates are set up, as per Netlify CMS standards.

`components` contains various React components in use throughout the site.

`fonts` is where the web font source files are kept.

`layouts` is as per Gatsby standards - it contains the global wrapper layout component for the site, as well as the global CSS file.

`pages` is the Gatsby standard directory for single pages, however, due to the nature of this blog, we don't use it as all the pages are generated via the `gatsby-node.js` file which builds them into the templates. There are two files in this directory; the index page which is only there to redirect the user into the appropriate language home page and the 404 page which renders when a user navigates to a non-existing page.

`svg` contains the raw SVGs used for icons/logo before `svgr` makes them into React components. These files have been optimised with SVGO. `npm run optimize:svg` will optimise any new SVGs that are added.

`templates` contains React components for each of the main page templates. These files also contain the GraphQL queries to fetch the relevant data for those page.

`tokens` is where common site variables (mostly for styling) are stored. Colour palette, media query breakpoints, dimensions etc. are in here to keep things consistent and easy to manage.

### Root directory

On the root, aside from the standard `package.json` and dotfiles, you'll find the Gatsby standard `gatsby-config.js` and `gatsby-node.js`.

`gatsby-config.js` is where some basic config is set up, but mostly contains details of (and configuration for) the various Gatsby plugins which are in use.

`gatsby-node.js` is where a lot of magic happens. This is quite heavily customised due to the nature of the site. It is responsible for creating the pages of the site, which, in this case, includes all the pages for pagination, and the localised variants. It also links up data items to page nodes (like making CMS images into ImageSharp nodes so gatsby-image works properly).

## Styles

Outside of the small amount of global CSS injected into the main layout component, we use `styled-components` for styling the React components. styled-components is a CSS-in-JS library which gives many advantages when working with React, such as dynamic styles based on props, JS variables for sizing/colours etc. and locally scoped component styles ensuring the styles will never leak out of a component.

A component's styles are stored at the top of a component file, after the imports.

## Data flow

For the pages that just list posts in tile form, all of the data management is handled by the `gatsby-node.js` file. The posts are then passed to the template in the `pathContext`.

Those templates will do their own GraphQL queries for extra data though, for example, getting the content for the "Popular posts" box, or categories data to give to the categories list and search dropdown.

The `search.jsx` template queries the top 1000 posts in the current locale and then filters them client-side based on the search parameters.

The `post.jsx` template does the most extra data querying since it has to retrieve author data, related posts data, as well as all the post data including SEO items.

The other `index.jsx` and `tag.jsx` perform standard queries for the "Popular posts" and "Categories" lists. The `tag` template will also go and find the current category's data as it's more simple than doing the lookup client side.

##

## Plugins

The `gatsby-config.js` file shows all the plugins in use, but any special requirements are detailed here: 

### `gatsby-plugin-react-helmet`

Standard - allows the `<head>` of a page to be manipulated from within a component.

### `gatsby-plugin-i18n`

Provides the multilanguage support - uses `react-intl` under the hood.

### `gatsby-source-filesystem`

Standard Gatsby plugin to allow reading from local filesystem directories with GraphQL.

### `gatsby-transformer-json`

Allows using JSON files as data endpoints.

### `gatsby-transformer-remark`

Transforms the markdown files into HTML.

### `gatsby-plugin-mailchimp`

Allows subscriptions to Mailchimp. The Mailchimp endpoint needs to be configured in the `SiteConfig` file. Instructions for setting up Mailchimp can be found on the plugin's GitHub repo.

### `gatsby-plugin-svgr`

Allows using SVGR to generate React components from SVGs.

### `gatbsy-plugin-nprogress`

Provides the small loading progress bar across the top of the page when navigating between pages.

### `gatsby-plugin-google-tagmanager`

Injects the Google Tag Manager scripts. Google tag manager ID needs to be configured in `SiteConfig`.

### `gatsby-plugin-favicon`

Takes a source favicon image and generates appropriate files for relevant devices/platforms and injects them into the `<head>`.

### `gatsby-plugin-sharp`, `gatsby-transformer-sharp`

Image processor used by `gatsby-image`.

### `gatbsy-plugin-catch-links`

Catches markdown links to internal pages and turns them into Gatsby `<Link />` components to avoid a page refresh when navigating to them.

### `gatsby-plugin-sitemap`

Generates a sitemap XML file and injects a link to it into the `<head>`.

### `gatsby-plugin-styled-components`

Allows usage of the CSS-in-JS library `styled-components` to style the React components.

### `gatsby-plugin-netlify-cms`

Automates the process of adding the CMS HTML files/scripts.

### `gatsby-plugin-netlify`

Allows configuration to be set at Netlify. Current config provided by SHO.ai

### `gatsby-plugin-offline`

Adds offline support to the site with ServiceWorker etc. Config has been customised slightly to keep the CMS working as expected.