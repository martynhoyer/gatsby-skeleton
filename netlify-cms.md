# Netlify CMS

## Getting started

CMS users can be invited to the project via email. You will receive an invite link in your inbox.

Click "accept the invite" and you will be taken to the site and prompted to enter a password.

Once you've entered your password, you'll be logged in to the CMS and presented with the "Collections" view.

You can now access the CMS at any time by navigating to `blog.gymlib.com/admin`, which will load Netlify CMS and prompt you to log in (or log you in automatically if you've logged in recently).

## Collections

A "collection" in Netlify CMS is a generally group of related content items. We have the following collections:

### Site config

This contains some editable global configuration items for the site as a whole, for example, social media profile details, or the amount of blogs to show per page.

### Authors

This is where author details are added. Authors needs to be added here to allow them to have images. These authors can then be associated with blog posts.

### Categories in French/Categories in English

Like authors, categories consist of more than just a category name (they also have a colour associated with them) so need to be set up as separate collection items. Categories are also language-specific, so we have a collection for each language.

### Languages

This is where all of the text content that isn't part of the articles (like headings/menu items/sidebar content) is edited for each language. Entries are grouped in sections and named to hopefully make it clear where and how they're used.

### Blog in French/Blog in English

This is where the posts are created and edited, with a collection for each language.

## Netlify CMS flow

Every time something is "published" in Netlify CMS, it creates a new commit and pushes it to the repository. Because Netlify rebuilds the site on every push to `master`, publishing something in the CMS will trigger a rebuild.

This does mean changes made in the CMS will not be seen on the site instantly, but it's generally done in around five minutes.

## Creating/editing authors

When in the authors collection, you can either click an existing author from the list to edit them, or create a new author using the "New authors" button in the top right. Authors have three pieces of data: 

* The `Author ID` which should be a unique string. This is never displayed publicly, but is used to connect authors to posts in the code, so it should be all lower-case, have no punctuation, and contain `hyphens-for-spaces` (if there are spaces). Just the author's first name on its own will be fine, assuming all authors have a unique first name!
* The `Display name` is the name which will be shown on the site, so should be written as it is intended to be displayed (correct captilisation etc.).
* The `Image` allows you to upload or select an already uploaded image from the media library. For authors, the images are cropped into circles. You don't need to provide a circular image, but you should try to upload a square image to keep the results predictable.

Once this data is added, you can hit "Publish" in the top right corner. That will create a commit and push it to the repository and that author will then be available to select in the author field of a blog post.

## Creating/editing categories

Categories are fairly similar to authors - but instead of images, they have a colour code. It's basically the same concept though - they have an ID, a display name, and a colour code.

There is a categories collection for each language.

You can edit an existing category or create a new one using the "New categories" button in the top right.

* The `Category ID` which should be a unique string. This is never displayed publicly, but is used to connect categories to posts in the code, so it should be all lower-case, have no punctuation, and contain `hyphens-for-spaces` (if there are spaces).
* The `Display name` is the name which will be shown on the site, so should be written as it is intended to be displayed (correct captilisation etc.).
* The `Colour` is the hex code of the colour you'd like the category to display in. The colours are used on the categories list on the sidebar, in the category text on post tiles and the post pages and in the page title for the category listings pages. You should keep this in mind when choosing a colour - `#ffffff` (white) for example would be a bad choice because it won't be readable.

Once this data is added, you can hit "Publish" in the top right corner. That will create a commit and push it to the repository and that author will then be available to select in the author field of a blog post.

## Creating/editing posts

Like categories, there's a collection of posts for each language, to keep them clearly separated. Select the appropriate collection and you'll see a list of posts (they'll be in date order, listed by post title) then you can edit an existing post or create a new one.

The post view also has a right-hand preview column to give you a rough idea on how the post will look. This is **not** an absolute representation of the post template, it just shows how certain elements will display and in what order.

As you might expect, posts have quite a few options/fields to complete:

* `Is published` is a toggle switch which allows you to save posts with a draft status if they're not ready to publish yet. Only posts that are set as published will display on the site. This field defaults to true.
* `Title` is the title of the post, shown in the listings and throughout the site (and also used in the SEO elements unless overridden)
* `Category` will connect the post to one of the existing categories. You can start typing your category name and you should then select it from the suggestions. Be careful not to edit this field after making the selection as the link would then be lost and the build would most likely fail if it can't make that connection.
* `Tags` is a free text list. You can add tags and separate them with a comma. While things aren't as strict as with categories, it's still recommended to be consistent with tag naming, otherwise your pages won't be grouped properly by tag, or you'll have tag index pages that are almost the same, but not quite!
* `Publish date` is the date for the post, displayed on the posts, but also used for ordering. This defaults to the "current" date/time at creation time, but can be edited. Posts set to be in the future _will_ still display on the site (you could toggle them off with the `is published` toggle if you wanted)
* `Author` is a bit like `category`, you should start typing your author name and then select the right from the suggestions, otherwise the post won't build correctly.
* `Alternate language links` allows you to connect posts from another language together. To make a new connect click the "Add alternate language links" button. That will give you two fields to enter - the language code of the post you're linking to (two-letter code, for example `fr`) and the URL of that post (so it should already be published). You can add as many alternate language links as you like (although while we only have two languages, it's likely you'll only ever be adding one)
* `Show on popular posts sidebar` is a toggle switch which allows you to flag a post as "popular" and push it into the list on the sidebar. This list will show the four most recent posts (for the current language) which have this flag set. This means you don't have to switch the flag off for old posts, but if a post isn't showing and you want it to, it's likely to have a more recent post blocking it.
* `Image` is where the post image is added. You can "choose an image" and either select one from the media library, or upload a new image. Images added here will be process into multiple sizes, so you can upload a large image here and it will be resized/optimised before appearing on the site.
* `Content` is the main body of the post, in markdown form. The editor here gives you the option to switch between rich text and markdown. It's worth bearing in mind that there will already be an `h1` element on the post page (the post title) so adding more `h1` elements in the markdown could have a negative effect on the search engine optimisation. We should be able to customise the markdown editor controls soon and getting more heading levels added in (and probably remove the `h1`), but that's a feature currently in development at Netlify CMS.
* `SEO` is a group of fields that allows you to specifically override certain SEO meta tags/elements and do more specific targeting. This is covered more deeply in the SEO section.

## Editing site config

It's not possible to add new entries into the config file in the CMS (because the code would also need to be updated), so you can only edit existing entries. This is a simple process, just find the entry you want to change, make your amends and then press "publish" in the top right corner.

## Editing language content

Like the site config, you can only edit existing entries in the language files.

You may come across some entries which contain text surrounded by curly braces, for example `dans la catégorie: {category}`. That represents some dynamic data - in this case it's the category the user has searched for. We expose it in the translations to give you some better context around how the text is used. Editing these variables could stop things working as expected, so tread carefully here!

## SEO

Site-wide SEO data is stored in the language files. There's a `global` group with some SEO-specific fields and also a titles for the pages.

Post-level SEO is built in to the post files. There is an SEO group at the bottom of the post edit view containing the following fields:

* `Title` this is not a required field, and if left blank, the title of the post will be used.
* `og:title` allows you to override the title specifically for the `og:title` meta tag. If left blank, the `Title` field above will be used (and if that's blank, the post title will be used).
* `Description` is a required field and is used to populate the meta description. If this is left blank, the post excerpt is used.
* `og:description` allows you to override the description specifically for the `og:description` meta tag. If left blank the `Description` field will be used (and if that's left blank, the post excerpt will be used).
* `Keywords` allows you to set post-specific keywords into the keywords meta tag. These should be entered as comma-separated keywords. If left blank, the post's tags will be used.
* `article:tag` allows you to specify a comma-separated list of tags for the `article:tag` meta tags. If left blank, the `Keywords` above will be used (and if that's blank, the post tags will be used)
* `og:image` allows you to set the `og:image` meta tag. If left blank, the post image will be used.
* `Additional custom entries` allows you to set up specific custom meta tags for a post. Each entry has three fields to fill out; the `Type`, the `Type value` and the `Content`. The resultant meta tag will render as `<meta [type]="[type value]" content="[content]">`
