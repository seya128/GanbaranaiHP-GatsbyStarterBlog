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
        <div class="mx-auto max-full py-1 px-1 sm:px-6 lg:px-8">
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
        </div>
      </Layout>
    )
  }

  return (
    <Layout location={location} title={siteTitle}>
      <Seo topFlag={true} />
      <aside
        class="overflow-hidden relative sm:items-center bg-stone-400"
      >
        <div class="flex justify-end relative">
          <StaticImage 
            src="../images/mori.jpg" 
            alt="はーつん"
            loading="eager"
            class=" max-w-2xl sm:rounded-tl-[30px] md:rounded-tl-[60px]"
          />
          <a href="https://www.instagram.com/haatsun_do/" class="absolute bottom-0.5 right-0.5 text-xs text-white">絵：もりはじめ</a>
        </div>
        <div class=" absolute top-0 left-0 p-8 md:p-12 lg:px-16 lg:py-24">
          <div class="max-w-xl mx-auto text-center sm:text-left" >
            <h2 class="text-2xl font-bold text-stone-100 my-1 mx-0 md:text-3xl drop-shadow-[0_0px_3px_rgba(0,0,0,1)]">
            がんばり過ぎていませんか？
            </h2>

            <p class="block text-sm text-gray-100 md:text-base md:mt-4 md:block drop-shadow-[0_0px_1.5px_rgba(0,0,0,1)]">
              頑張ることは素晴らしい。<br/>
              しかし、頑張ることが目的ではないはず。<br/>
              頑張り過ぎで疲弊しないよう、力を抜いて、楽しみながらいろいろなことができたらいいですよね。<br/>
              ガンバラナイは、がんばらない為のサービスや技術を提供していきます。
            </p>
          </div>
        </div>

      </aside>

      <div class="container mx-auto px-1 sm:px-6 lg:px-8">
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
        </div>
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
    }
  }
`
