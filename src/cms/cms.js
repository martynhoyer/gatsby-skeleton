import CMS from 'netlify-cms'
import BlogPostPreview from './preview-templates/BlogPostPreview'

// Registers the English preview template
CMS.registerPreviewTemplate('english_posts', BlogPostPreview)
// Registers the French preview template
CMS.registerPreviewTemplate('french_posts', BlogPostPreview)
