import React, { useState } from 'react'
import { Link } from "gatsby"

const HeaderNavi = ({menuItems}) => {

  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <header id="pageTop" class="w-full mx-auto flex justify-between items-center bg-stone-600 border-b-2 border-stone-500">
        <Link to="/"><h1  class="my-1 mx-4 text-lg text-white">ガンバラナイ</h1></Link>
        <nav class="flex items-center mx-4">
          
          <div class={
              (isNavOpen ? `visible left-0 mt-0` : `invisible mt-[-600px]`) +
              `
                list-none flex flex-col text-center mx-0 mb-0 z-50
                fixed top-0 left-0 w-full h-52 bg-stone-600
                duration-500 md:transition-none md:mt-[-600px]
              `}>
            <ul>
              {menuItems.map(([title, url]) => (
                <li class="m-0">
                  <Link to={url} 
                    className=" text-white block px-6 py-3 text-lg duration-500 hover:bg-stone-500"
                    activeClassName=" text-white block px-6 py-3 text-lg duration-500 hover:bg-stone-500"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
            <button onClick={() => setIsNavOpen(false)} 
              class="z-50 absolute top-0 right-0 p-4 duration-500" >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="stroke-white w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <ul class={
            `
              list-none text-center m-0
              flex-row static hidden md:flex
            `}>
            {menuItems.map(([title, url]) => (
              <li class="m-0">
                <Link to={url} 
                  className="text-white block px-2 py-3 text-sm duration-500 hover:bg-stone-500"
                  activeClassName="text-white block px-2 py-3 text-sm duration-500 hover:bg-stone-500"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
          <button onClick={() => setIsNavOpen(!isNavOpen)} class="md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="stroke-white w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </nav>
    </header>
  )
}

export default HeaderNavi