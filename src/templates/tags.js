import * as React from "react"
import { graphql } from "gatsby"


import Layout from "../components/layout"
import Seo from "../components/seo"
import PostGrid from "../components/post-grid"


const TagsTemplate = ({ data, location ,pageContext }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMdx.nodes
  const {tag} = pageContext
  const title = `タグ「${tag}」記事一覧`

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={tag}
        description={title}
      />
      <div class="container mx-auto px-1 sm:px-6 lg:px-8">
        <h1>{title}</h1>
        <section>
          <PostGrid posts={posts}></PostGrid>
        </section>
      </div>        
    </Layout>
  )
}

export default TagsTemplate

export const pageQuery = graphql`
  query($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
      limit: 1000      
      ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "YYYY-MM-DD")
          title
          description
          blog
          image {
            childImageSharp {
              gatsbyImageData(
                layout: CONSTRAINED
                transformOptions: {
                  fit: COVER
                  cropFocus: ATTENTION
                }
                aspectRatio: 2
                width: 800
              )
            }
          }
        }
      }
    }
  }
`
