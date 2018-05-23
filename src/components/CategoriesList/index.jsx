import React from 'react'
import Link from 'gatsby-link'
import _ from 'lodash'
import { FormattedMessage, injectIntl } from 'react-intl'
import styled from 'styled-components'
import { fontsize } from '../../tokens/dimensions'

const Title = styled.h2`
  margin: 0;
  font-size: ${fontsize.base};
`

const List = styled.ul`
  margin: 0;
  padding: 0 0 0 1em;
  text-indent: -0.25em;
`

const ListItem = styled.li`
  margin: 1em 0 0;
  color: ${props => props.color};
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:hover,
  &:focus {
    font-weight: bold;
  }
`

const CategoriesList = ({ categories = [], intl }) => {
  const { locale } = intl
  if (!categories.length) return null
  return (
    <div>
      <Title>
        <FormattedMessage id="sidebar.categories.heading" />
      </Title>
      <List>
        {categories.map(({ node: category }) => (
          <ListItem key={`${category.title}+${locale}`} color={category.color}>
            <StyledLink to={`/${locale}/categories/${_.kebabCase(category.title)}`}>{category.displayName}</StyledLink>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default injectIntl(CategoriesList)
