import React from 'react'
import moment from 'moment'

const BlogPostPreview = ({ entry, widgetFor }) => {
  const locale = entry.getIn(['data', 'locale'])
  require(`moment/locale/${locale}`)
  const date = moment(new Date(entry.getIn(['data', 'date']))).format('DD MMMM YYYY')
  const categoryJsonPath = `${locale}-${entry.getIn(['data', 'category'])}`
  console.log(categoryJsonPath)
  const category = require(`../../../content/categories/fr-du-cote-de-gymlib.json`)
  console.log(category.displayName)
  return (
    <div>
      <div>
        <img src={entry.getIn(['data', 'image'])} alt="" />
      </div>
      <div>{category.displayName}</div>
      <div>{date}</div>
      <h1>{entry.getIn(['data', 'title'])}</h1>
      <div>{widgetFor('body')}</div>
      <div>{entry.getIn(['data', 'tags'])}</div>
    </div>
  )
}

export default BlogPostPreview
