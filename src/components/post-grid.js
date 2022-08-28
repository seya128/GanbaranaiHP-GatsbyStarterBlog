import * as React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./post-grid.module.css"

const PostGrid = ({posts}) => {

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => {
        const title = post.frontmatter.title || post.fields.slug
        const image = getImage(post.frontmatter.image)||null
        return (
          <section key={index}>
            <Link to={post.fields.slug} className={styles.item}>
              <div className={styles.image}>
                {image && (
                <GatsbyImage image={image} alt={post.frontmatter.title} className={styles.image} loading="lazy"/>
                )}
              </div>
              <section className={styles.section}>
                <div className={styles.date}>{post.frontmatter.date}</div>
                <h2 className={styles.title}>
                  {title}
                </h2>
                <p className={styles.p}
                  dangerouslySetInnerHTML={{
                    __html: post.frontmatter.description || post.excerpt,
                  }}
                  itemProp="description"
                />
              </section>
            </Link>
          </section>
        )
      })}
    </div>
  )
}

export default PostGrid