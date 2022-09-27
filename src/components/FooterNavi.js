import React from 'react'
import { Link as ScrollLink } from "react-scroll"
import { Link } from "gatsby"

const FooterNavi = ({menuItems}) => {

  return (
    <footer class="bg-stone-100">
      <div
        class="relative max-w-screen-xl px-4 py-8 mx-auto sm:px-6 lg:px-8 lg:pt-8"
      >
        <button class="absolute top-0 right-4 sm:right-6 lg:right-8">
          <ScrollLink
            class="inline-block p-2 text-white transition bg-cyan-600 rounded-full shadow sm:p-3 lg:p-4 hover:bg-cyan-500"
            to="pageTop"
            smooth={true}
            duration={500}
          >
            <span class="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </ScrollLink>
        </button>

        <div class="lg:flex lg:items-end lg:justify-between">
          <div>
            <div class="flex justify-center lg:justify-start">
              <Link to="/"><div class="my-1 mx-4 text-base text-cyan-800">GANBARANAI</div></Link>
            </div>

            <p
              class="max-w-md mx-auto my-1 leading-relaxed text-sm text-center text-stone-500 lg:text-left"
            >
              がんばり続ける日常から、がんばらない日常へ
            </p>
          </div>

          <nav class="mt-10 lg:mt-12" aria-labelledby="footer-navigation">
            <h2 class="sr-only" id="footer-navigation">Footer navigation</h2>

            <ul
              class="flex flex-wrap justify-center gap-6 lg:justify-end md:gap-8 lg:gap-12"
            >
              {menuItems.map(([title, url]) => (
                <li>
                  <Link to={url} 
                    className="text-stone-700 transition hover:text-stone-700/75 text-base"
                    activeClassName="text-stone-700 transition hover:text-stone-700/75"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p class="mt-6 text-xs text-center border-stone-500 lg:text-right">
          &copy; 2022 GANBARANAI.
        </p>
      </div>
    </footer>

  )
}

export default FooterNavi