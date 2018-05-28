import React from 'react'
import moment from 'moment'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const locale = entry.getIn(['data', 'locale'])
  require(`moment/locale/${locale}`)
  const date = moment(new Date(entry.getIn(['data', 'date'])))
    .format('YYYY-MM-DD')
    .locale()
  return (
    <div>
      <div>{entry.getIn(['data', 'image'])}</div>
      <div>{entry.getIn(['data', 'category'])}</div>
      <div>{date}</div>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <div>{widgetFor('body')}</div>
      <div>{entry.getIn(['data', 'tags'])}</div>
    </div>
  )
}

export default BlogPostPreview
