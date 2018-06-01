import React, { Component } from 'react'

class BlogPostPreview extends Component {
  render() {
    const { entry, widgetFor } = this.props
    return (
      <div
        style={{
          fontFamily:
            '-apple-system, BlinkMacSystemFont, Roboto, Oxygen, Ubuntu, Cantarell, “Fira Sans”, “Droid Sans”, “Helvetica Neue”, Arial, sans-serif',
        }}>
        <img style={{ display: 'block', maxWidth: '100%' }} src={entry.getIn(['data', 'image'])} alt="" />
        <h1 style={{ textAlign: 'center' }}>{entry.getIn(['data', 'title'])}</h1>
        <div>{widgetFor('body')}</div>
      </div>
    )
  }
}

export default BlogPostPreview
