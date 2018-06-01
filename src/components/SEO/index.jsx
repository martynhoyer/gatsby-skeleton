import React from 'react'
import Helmet from 'react-helmet'
import { injectIntl } from 'react-intl'
import config from '../../../data/SiteConfig.json'

const SEO = ({ postNode, postSEO, author, intl }) => {
  let title
  let description
  let keywords
  let image
  let postURL
  let locale
  let publishTime
  let ogTitle
  let ogDescription
  let ogArticleTags
  let ogImage
  let additionalCustomTags

  const globalSiteTitle =
    intl.messages['global.seo.siteTitle'] &&
    intl.formatMessage({
      id: 'global.seo.siteTitle',
    })

  const globalSiteDescription =
    intl.messages['global.seo.siteDescription'] &&
    intl.formatMessage({
      id: 'global.seo.siteDescription',
    })

  const globalSiteKeywords =
    intl.messages['global.seo.siteKeywords'] &&
    intl.formatMessage({
      id: 'global.seo.siteKeywords',
    })

  if (postSEO) {
    const postMeta = postNode.frontmatter
    ;({ locale, title, date: publishTime } = postMeta)
    image = postNode.thumbnailArray[0].sizes.originalImg
    description = postMeta.seo && postMeta.seo.description ? postMeta.seo.description : postNode.excerpt
    postURL = `${config.siteUrl}/${postNode.frontmatter.locale}${postNode.fields.slug}`
    keywords = postMeta.seo && postMeta.seo.keywords ? postMeta.seo.keywords : postMeta.tags
    title = (postMeta.seo && postMeta.seo.title) || title
    ogTitle = postMeta.seo && postMeta.seo.ogTitle
    ogDescription = postMeta.seo && postMeta.seo.ogDescription
    ogArticleTags = postMeta.seo && postMeta.seo.ogArticleTags
    ogImage = postMeta.seo && postMeta.seo.ogImage
    additionalCustomTags = postMeta.seo && postMeta.seo.additional
  } else {
    title = globalSiteTitle
    description = globalSiteDescription
    image = config.siteLogo
    keywords = globalSiteKeywords
  }
  image = config.siteUrl + image
  const blogURL = config.siteUrl
  const schemaOrgJSONLD = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: globalSiteTitle,
    },
  ]
  if (postSEO) {
    schemaOrgJSONLD.push({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebSite',
        '@id': blogURL,
      },
      url: postURL,
      name: title,
      author: author.displayName,
      headline: title,
      datePublished: publishTime,
      dateModified: publishTime,
      publisher: {
        '@type': 'Organization',
        name: config.organizationName,
        logo: {
          '@type': 'ImageObject',
          url: config.siteUrl + config.siteLogo,
        },
      },
      image: {
        '@type': 'ImageObject',
        url: image,
      },
      description,
    })
  }

  const ogTags = ogArticleTags || keywords

  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="image" content={image} />
      {postSEO && <meta name="author" content={author.displayName} />}
      {postSEO && <link rel="canonical" href={postURL} />}

      {/* Schema.org tags */}
      <script type="application/ld+json">{JSON.stringify(schemaOrgJSONLD)}</script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : <meta property="og:type" content="website" />}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:site_name" content={globalSiteTitle} />
      {/* <meta property="og:locale" content={locale} /> */}
      <meta property="og:image" content={ogImage || image} />
      {postSEO && ogTags.map(tag => <meta key={tag} property="article:tag" content={tag} />)}
      <meta property="fb:app_id" content={config.siteFBAppID ? config.siteFBAppID : ''} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={config.userTwitter ? config.userTwitter : ''} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional custom meta tags */}
      {postSEO &&
        additionalCustomTags &&
        additionalCustomTags.map(
          tag =>
            tag.type === 'name' ? (
              <meta key={tag.type + tag.typeValue + tag.content} name={tag.typeValue} content={tag.content} />
            ) : (
              <meta key={tag.type + tag.typeValue + tag.content} property={tag.typeValue} content={tag.content} />
            ),
        )}
    </Helmet>
  )
}

export default injectIntl(SEO)
