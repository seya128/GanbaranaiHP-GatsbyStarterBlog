import * as React from "react"
import { graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"


// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostGrid from "../components/post-grid"
import TopCard from "../components/top-card"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const all_posts = data.allMdx.group

  const about_posts = all_posts.find(group => group.fieldValue==="about").edges.map(edge => edge.node)

  const blogs = [
    {
      label: "ガンバラナイBLOG",
      posts: all_posts.find(group => group.fieldValue==="ガンバラナイ").edges.map(edge => edge.node),
      link: "/blog/"
    },
    {
      label: "技術BLOG",
      posts: all_posts.find(group => group.fieldValue==="Tech").edges.map(edge => edge.node),
      link: "/tech-blog/"
    }
  ]

  if (all_posts.length === 0) {
    return (
      <Layout location={location} title={siteTitle}>
        <Seo topFlag={true} />
        <StaticImage 
          src="../images/mori.jpg" 
          alt="はーつん"
          layout="fullWidth"
          loading="eager"
          />
        <p>
          No blog posts found. Add markdown posts to "content/blog" (or the
          directory you specified for the "gatsby-source-filesystem" plugin in
          gatsby-config.js).
        </p>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo topFlag={true} />
      <StaticImage 
        src="../images/mori.jpg" 
        alt="はーつん"
        layout="fullWidth"
        loading="eager"
      />
      
      <div>
        <p>がんばり過ぎていませんか？</p>
        頑張ることは素晴らしい。<br/>
        しかし、頑張ることが目的ではないはず。<br/>
        頑張り過ぎで疲弊しないよう、力を抜いて、楽しみながらいろいろなことができたらいいですよね。<br/>
        ガンバラナイは、がんばらない為のサービスや技術を提供していきます。
      </div>
      
      <h3>がんばり過ぎる前に、ご相談ください</h3>
      <TopCard posts={about_posts}></TopCard>

      {blogs.map((blog => {
        return(
          <div key={blog.label}>
            <h3><Link to={blog.link}>{blog.label}</Link></h3>
            <PostGrid posts={blog.posts}></PostGrid>
            <p><Link to={blog.link}>&gt;&gt;もっと見る</Link></p>
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
      group(field: frontmatter___blog, limit: 4) {
        fieldValue
        edges {
          node {
            excerpt
            fields {
              slug
            }
            frontmatter {
              date(formatString: "MMMM DD, YYYY")
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
    }
  }
`
