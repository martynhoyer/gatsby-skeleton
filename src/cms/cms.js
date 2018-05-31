import CMS from 'netlify-cms'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewTemplate('english_posts', BlogPostPreview)
CMS.registerPreviewTemplate('french_posts', BlogPostPreview)
