import * as React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import * as styles from "./top-card.module.css"

const TopCard = ({posts}) => {

  return (
    <div className={styles.grid}>
      {posts.map((post, index) => {
        const title = post.frontmatter.title || post.fields.slug
        const image = getImage(post.frontmatter.image)||null
        return (
          <section key={index} className={styles.item}>
              <div className={styles.image}>
                {image && (
                <GatsbyImage image={image} alt={post.frontmatter.title} className={styles.image} loading="lazy"/>
                )}
              </div>
              <section className={styles.section}>
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
          </section>
        )
      })}
    </div>
  )
}

export default TopCard