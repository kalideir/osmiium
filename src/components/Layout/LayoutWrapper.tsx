import React, { ReactNode } from 'react';
import { Footer } from '.';
import Header from './Header';

function LayoutWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 xl:max-w-5xl xl:px-0 text-slate-600 dark:text-slate-200">
      <div className="flex h-screen flex-col justify-between">
        <Header />
        <main className="mb-auto  rounded-lg">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default LayoutWrapper;
