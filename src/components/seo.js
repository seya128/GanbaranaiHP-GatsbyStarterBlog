/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({ description, lang, title, image, topFlag }) => {
  const { site } = useStaticQuery(query)
  const { pathname } = useLocation();

  const { siteMetadata } = site;

  const seo = {
    title: title ? `${title} | ${siteMetadata.title}` : `${siteMetadata.title} | ${siteMetadata.subTitle}`,
    description: description || siteMetadata.description,
    image: `${siteMetadata.siteUrl}${image || siteMetadata.ogpImage}`,
    url: pathname ? `${siteMetadata.siteUrl}${pathname}` : `${siteMetadata.siteUrl}`,
    pageType: topFlag ? "website" : "article",
  };

  return (
    <Helmet>
      <html lang={lang} />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <link rel="canonical" href={seo.url} />
      {<meta property="og:site_name" content={siteMetadata.siteName} />}
      {seo.url && <meta property="og:url" content={seo.url} />}
      {seo.pageType && <meta property="og:type" content={seo.pageType} />}
      {seo.title && <meta property="og:title" content={seo.title} />}
      {seo.description && <meta property="og:description" content={seo.description} />}
      {seo.image && <meta property="og:image" content={seo.image} />}
      {seo.title && <meta property="og:image:alt" content={seo.title} />}
      <meta name="twitter:card" content="summary_large_image" />
      {seo.title && <meta name="twitter:title" content={seo.title} />}
      {seo.description && <meta name="twitter:description" content={seo.description} />}
      {seo.image && <meta name="twitter:image" content={seo.image} />}
    </Helmet>
  )
}

Seo.defaultProps = {
  lang: `ja-JP`,
  title: null,
  description: null,
  topFlag: false,
  image: null,

}

Seo.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  topFlag: PropTypes.bool,
}

const query = graphql`
query {
  site {
    siteMetadata {
      title
      subTitle
      description
      siteUrl
      ogpImage
      social {
        twitter
      }
    }
  }
}
`

export default Seo
