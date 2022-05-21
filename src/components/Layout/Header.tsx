import Link from 'next/link'
import React from 'react'
import { ThemeSwitch } from '.'

function Header() {
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="osmiium">
          <div className="flex items-center justify-between dark:text-zinc-50 text-zinc-800">
            <div className="hidden h-6 text-2xl font-semibold sm:block">Osmiium</div>
          </div>
        </Link>
      </div>
      <div className="flex items-center text-base leading-5">
        <div className="hidden sm:block">
          {[].map((link: { title: ''; href: '' }) => (
            <Link
              key={link.title}
              href={link.href}
              className="p-1 font-medium text-zinc-900 dark:text-zinc-100 sm:p-4"
            >
              {link.title}
            </Link>
          ))}
        </div>
        <ThemeSwitch />
      </div>
    </header>
  )
}

export default Header
