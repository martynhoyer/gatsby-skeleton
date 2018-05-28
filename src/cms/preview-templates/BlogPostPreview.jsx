import React from 'react'
import moment from 'moment'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const locale = entry.getIn(['data', 'locale'])
  require(`moment/locale/${locale}`)
  const date = moment(new Date(entry.getIn(['data', 'date']))).format('DD MMMM YYYY')
  const categoryJsonPath = `${locale}-${entry.getIn(['data', 'category'])}`
  const category = require(`../../../content/categories/${categoryJsonPath}.json`)
  const authorJsonPath = `${entry.getIn(['data', 'author'])}`
  const author = require(`../../../content/authors/${authorJsonPath}.json`)
  return (
    <div>
      <img style={{ display: 'block', maxWidth: '100%' }} src={entry.getIn(['data', 'image'])} alt="" />
      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        {category.displayName} {date}
      </div>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <div>{widgetFor('body')}</div>
      <div style={{ textAlign: 'center' }}>
        <h4 style={{ marginBottom: '0' }}>Tags</h4>
        {entry.getIn(['data', 'tags'])}
      </div>
      <div style={{ textAlign: 'center', marginTop: '1em' }}>
        <h4>Author</h4>
        {author.displayName}
      </div>
    </div>
  )
}

export default BlogPostPreview
