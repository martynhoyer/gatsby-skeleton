import React from 'react'
import moment from 'moment'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const locale = entry.getIn(['data', 'locale'])
  require(`moment/locale/${locale}`)
  const date = moment(new Date(entry.getIn(['data', 'date']))).format('DD MMMM YYYY')
  const categoryJsonPath = `${locale}-${entry.getIn(['data', 'category'])}`
  const category = require(`../../../content/categories/${categoryJsonPath}.json`)
  return (
    <div>
      <div>
        <img style={{ maxWidth: '100%' }} src={entry.getIn(['data', 'image'])} alt="" />
      </div>
      <div>
        {category.displayName} {date}
      </div>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <div>{widgetFor('body')}</div>
      <div>
        <h4>Tags</h4> {entry.getIn(['data', 'tags'])}
      </div>
    </div>
  )
}

export default BlogPostPreview
