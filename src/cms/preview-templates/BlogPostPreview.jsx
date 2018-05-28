import React from 'react'
import moment from 'moment'

class BlogPostPreview extends React.Component {
  componentDidMount() {
    const { entry } = this.props
    const locale = entry.getIn(['data', 'locale'])
    if (locale !== 'en') {
      require(`moment/locale/${locale}`)
      moment.locale(locale)
    }
  }

  render() {
    const { entry, widgetFor, widgetsFor } = this.props
    const locale = entry.getIn(['data', 'locale'])
    const date = moment(new Date(entry.getIn(['data', 'date']))).format('DD MMMM YYYY')
    const categoryJsonPath = `${locale}-${entry.getIn(['data', 'category'])}`
    const category = require(`../../../content/categories/${categoryJsonPath}.json`)
    const authorJsonPath = `${entry.getIn(['data', 'author'])}`
    const author = require(`../../../content/authors/${authorJsonPath}.json`)
    return (
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif',
        }}>
        <img style={{ display: 'block', maxWidth: '100%' }} src={entry.getIn(['data', 'image'])} alt="" />
        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <span style={{ color: category.color }}>{category.displayName}</span> {date}
        </div>
        <h1 style={{ textAlign: 'center' }}>{entry.getIn(['data', 'title'])}</h1>
        <div>{widgetFor('body')}</div>
        <div style={{ textAlign: 'center' }}>
          <h4 style={{ marginBottom: '0.5em' }}>Tags</h4>
          {entry.getIn(['data', 'tags']).map((tag, index, arr) => (
            <span key={tag}>
              {tag}
              {index !== arr.length - 1 ? ', ' : ''}
            </span>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '1em' }}>
          <h4 style={{ marginBottom: '0.5em' }}>Author</h4>
          {author.displayName}
        </div>
      </div>
    )
  }
}

export default BlogPostPreview
