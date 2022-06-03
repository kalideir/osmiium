/* eslint-disable @next/next/no-img-element */
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { ThemeSwitch } from '.';
import { toggleTypesVisibility } from '../../store/features/new';
import { useAppDispatch } from '../../store/hooks';

function Header() {
  const dispatch = useAppDispatch();
  return (
    <header className="flex items-center justify-between py-10">
      <div>
        <Link href="/" aria-label="osmiium">
          <div className="flex items-center cursor-pointer justify-between uppercase">
            <div className="h-6 text-2xl font-semibold sm:block flex items-center justify-start">
              <motion.div
                animate={{
                  scale: [1, 1.5, 1.5, 1, 1],
                  rotate: [0, 270, 270, 0],
                  borderRadius: ['20%', '20%', '50%', '20%'],
                }}
              >
                <img
                  onClick={() => dispatch(toggleTypesVisibility(true))}
                  src="https://cdn-icons-png.flaticon.com/512/5937/5937083.png"
                  alt=""
                  className="h-16 w-16"
                />
              </motion.div>
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
