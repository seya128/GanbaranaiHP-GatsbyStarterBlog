import * as React from "react"

import HeaderNavi from "../components/HeaderNavi"
import FooterNavi from "../components/FooterNavi"


const menu_items = [
  ['HOME', '/'],
  ['ガンバラナイBLOG', '/blog'],
  ['技術BLOG', '/tech-blog'],
  ['お問い合わせ', 'https://docs.google.com/forms/d/e/1FAIpQLSdOhqAu7m2K817j6aP2GuFPbXsYqnktg3s00IsF54R3nl3LQw/viewform?usp=sf_link']
]

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="h-full" data-is-root-path={isRootPath}>
      <HeaderNavi menuItems={menu_items}/>
      <main className="">{children}</main>
      <FooterNavi menuItems={menu_items}/>
    </div>
  )
}

export default Layout
