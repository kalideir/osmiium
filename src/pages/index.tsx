import React, { useEffect, useState } from 'react';
import { NewGameForm, PageSEO } from '../components';
import siteMetadata from '../../data/siteMetadata';

export default function App() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="p-3">
        <div className="py-7 bg-zinc-100 dark:bg-zinc-900 max-w-2xl mx-auto rounded-lg">
          <h3 className="text-3xl text-center font-bold dark:text-zinc-100 text-indigo-500 ">
            New Game
          </h3>
        </div>
        <NewGameForm />
      </div>
    </>
  );
}
