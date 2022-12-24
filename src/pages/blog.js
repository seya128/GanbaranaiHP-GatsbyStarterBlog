import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PostGrid from "../components/post-grid"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const all_posts = data.allMdx.nodes

  const blogs = [
    {
      label: "ガンバラナイBLOG",
      description: "比較的ゆるい感じの、ガンバラナイの活動、頑張らないヒントになるような記事を投稿しています。",
      posts: all_posts.filter(node => {return node.frontmatter.blog==="ガンバラナイ"})
    },
    // {
    //   label: "技術BLOG",
    //   description: "技術的な内容の記事を投稿しています。",
    //   posts: all_posts.filter(node => {return node.frontmatter.blog==="Tech"})
    // }
  ]

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title="ガンバラナイBLOG"
        description="ガンバラナイの活動や、頑張らないヒントになるような記事を投稿しています。"
      />
      
      {blogs.map((blog => {
        return(
          <div key={blog.label} class="container mx-auto px-1 sm:px-6 lg:px-8">
            <h1>{blog.label}</h1>
            <div><p>{blog.description}</p></div>
            <section>
              <PostGrid posts={blog.posts}></PostGrid>
            </section>
          </div>
          )
      }))}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
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
