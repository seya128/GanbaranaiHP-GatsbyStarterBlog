import * as React from "react"
import { Link, graphql } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Layout from "../components/layout"
import Seo from "../components/seo"

const TagsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const tags = data.allMdx.group
  tags.sort((a,b) => {
    if (kebabCase(a.fieldValue) > kebabCase(b.fieldValue)) {
      return 1;
    } else {
      return -1;
    }
  })


  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="Tags List"
        description="Tag一覧"
      />
      
      <div class="container mx-auto px-1 sm:px-6 lg:px-8">
        <h1>Tag一覧</h1>
        <ul class="flex flex-wrap">
        {tags.map(tag => (
        <li key={tag.fieldValue} class="mr-6">
          <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
            {tag.fieldValue} ({tag.totalCount})
          </Link>
        </li>  
        ))}
        </ul>
      </div>
    </Layout>
  )
}

export default TagsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      filter: { frontmatter: { blog: { ne: "about" } } }
      limit: 1000
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
