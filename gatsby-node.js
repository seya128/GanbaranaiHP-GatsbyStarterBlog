const path = require(`path`)
const _ = require("lodash")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
      {
        allMdx(
          sort: { fields: [frontmatter___date], order: ASC }
          filter: { frontmatter: { blog: { ne: "about" } } }
          limit: 1000
        ) {
          group(field: frontmatter___blog) {
            edges {
              node {
                id
                fields {
                  slug
                }
                frontmatter {
                  blog
                }
              }
            }
          }
        }
        tagsGroup: allMdx(
          filter: { frontmatter: { blog: { ne: "about" } } }
          limit: 1000
        ) {
          group(field: frontmatter___tags) {
            fieldValue
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  // Define a template for blog post
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  const groups = result.data.allMdx.group

  //ブログ別に記事ページ生成
  for (const {edges} of groups) {
    if (edges.length > 0) {
      edges.forEach(({node}, index) => {
        //console.log(node.frontmatter.blog)
        const previousPostId = index === 0 ? null : edges[index - 1].node.id
        const nextPostId = index === edges.length - 1 ? null : edges[index + 1].node.id

        createPage({
          path: node.fields.slug,
          component: blogPost,
          context: {
            id: node.id,
            previousPostId,
            nextPostId,
          },
        })
      })
    }
  }

  //タグ別記事一覧ページ生成
  const tags = result.data.tagsGroup.group
  tags.forEach(tag => {
    // console.log(tag.fieldValue)
    createPage({
      path: `/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: path.resolve(`./src/templates/tags.js`),
      context: {
        tag: tag.fieldValue,
      },
    })
  })

}


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value: `${value}`,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
