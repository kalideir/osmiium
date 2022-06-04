import Link from 'next/link';
import React from 'react';
import { ThemeSwitch } from '.';
import { reset } from '../../store/features/new';
import { useAppDispatch } from '../../store/hooks';

function Header() {
  const dispatch = useAppDispatch();
  return (
    <header className="flex items-center justify-between py-10 px-20">
      <div>
        <Link href="/" aria-label="osmiium">
          <div className="flex items-center cursor-pointer justify-between">
            <div className="text-2xl font-semibold sm:block flex items-center justify-start">
              <h1
                onClick={() => dispatch(reset())}
                className="text-4xl font-semibold 
  bg-gradient-to-r bg-clip-text  text-transparent 
  from-gray-900 via-indigo-500 to-gray-800
  animate-text
  "
              >
                Osmiium
              </h1>
            </div>
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
  );
}

export default Header;
