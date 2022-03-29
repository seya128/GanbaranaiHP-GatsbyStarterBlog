import * as React from "react"
import { Link, graphql } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

// import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const all_posts = data.allMarkdownRemark.nodes

  const blogs = [
    {
      label: "ガンバラナイBLOG",
      posts: all_posts.filter(node => {return node.frontmatter.blog==="ガンバラナイ"})
    },
    {
      label: "技術BLOG",
      posts: all_posts.filter(node => {return node.frontmatter.blog==="Tech"})
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
      />
      
      <div>
        がんばり過ぎていませんか？<br/>
        ガンバラナイは、がんばらない技術を提供していきます。
      </div>
      
      {blogs.map((blog => {
        return(
          <div>
            <h3>{blog.label}</h3>
            <ol style={{ listStyle: `none` }}>
              {blog.posts.map(post => {
                const title = post.frontmatter.title || post.fields.slug
                return (
                  <li key={post.fields.slug}>
                    <article
                      className="post-list-item"
                      itemScope
                      itemType="http://schema.org/Article"
                    >
                      <header>
                        <h2>
                          <Link to={post.fields.slug} itemProp="url">
                            <span itemProp="headline">{title}</span>
                          </Link>
                        </h2>
                        <small>{post.frontmatter.date}</small>
                      </header>
                      <section>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: post.frontmatter.description || post.excerpt,
                          }}
                          itemProp="description"
                        />
                      </section>
                    </article>
                  </li>
                )
              })}
            </ol>
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          blog
        }
      }
    }
  }
`
